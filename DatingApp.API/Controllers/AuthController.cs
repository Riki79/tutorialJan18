using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.DTOs;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _configuration;
        public AuthController(IAuthRepository repo, IConfiguration configuration)
        {
            _configuration = configuration;
            _repo = repo;

        }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDTO user)
    {
        // validate request

        user.Username = user.Username.ToLower();
        if (await _repo.UserExists(user.Username))
        {
            return BadRequest("Username already exists");

        }

        var userToCreate = new UserModel()
        {
            Username = user.Username
        };

        var createdUser = await _repo.Register(userToCreate, user.Password);
        return StatusCode(201);

    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserForLoginDTO userForLoginDto)
    {
        var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
        //Validate User exists
        if (userFromRepo == null)
        {
            return Unauthorized();
        };

    //Create claims - basic info for the user
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
            new Claim(ClaimTypes.Name,userFromRepo.Username)
        };

        //Take the servers signature and encode to be sent back
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

        //Encode the signature
        var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

        //Create the jWT structure and data 
        var tokenDescriptor = new SecurityTokenDescriptor(){
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = creds
        };

        //A token handler is required for a token to be created
        var tokenHandler = new JwtSecurityTokenHandler();

        //create the actual token
        var token = tokenHandler.CreateToken(tokenDescriptor);
        //Write it back :)
        return Ok(new { token = tokenHandler.WriteToken(token) });

    }

}
}