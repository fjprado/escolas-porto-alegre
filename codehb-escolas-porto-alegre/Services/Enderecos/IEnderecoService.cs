﻿using codehb_escolas_porto_alegre.Entities;
using codehb_escolas_porto_alegre.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace codehb_escolas_porto_alegre.Services.Enderecos
{
    public interface IEnderecoService
    {
        Task<List<Endereco>> GetListEnderecosSugeridos(EnderecoOrigemModel endereco);
    }
}
