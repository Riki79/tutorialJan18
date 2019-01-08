using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTOs
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(50,MinimumLength = 4, ErrorMessage="Password must be 4-50")]
        public string Password { get; set; }
    }
}