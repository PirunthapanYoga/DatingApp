using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController:BaseAPIController
    {
        private readonly DataContext _context;
        public ITokenService _tokenService;

        public AccountController(DataContext context , ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")] //api/accounts/register?username=dave&password=pwd
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.username)) return BadRequest("Username is taken");
  
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName =registerDto.username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password.ToLower())),
                PasswordSalt = hmac.Key
            };

            _context.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto{
                Username =user.UserName,
                Token =_tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x=> x.UserName == username.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x=> 
            x.UserName == loginDto.username.ToLower());

            if(user ==null) return Unauthorized("Invali Password / User Name");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computeHash =hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

            for(int i=0; i<computeHash.Length;i++){
                if(computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invali Password / User Name");
            }

            return new UserDto{
                Username =user.UserName,
                Token =_tokenService.CreateToken(user)
            };
        }

    }
}