import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  // Define o algoritmo de criptografia
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;
  private readonly iv: Buffer;

  constructor(private configService: ConfigService) {
    // 1. Obtém as strings de chave e IV do ConfigService
    const keyString = this.configService.get<string>('AES_KEY');
    const ivString = this.configService.get<string>('AES_IV');

    // 2. Valida a presença e o tamanho das chaves
    if (!keyString || !ivString) {
      throw new InternalServerErrorException(
        'Chave AES e/ou IV estão ausentes na configuração.',
      );
    }

    // O Buffer.from(string, 'hex') converte os caracteres hexadecimais para o Buffer binário
    this.key = Buffer.from(keyString, 'hex');
    this.iv = Buffer.from(ivString, 'hex');

    // Valida o tamanho final dos Buffers (32 e 16 bytes)
    if (this.key.length !== 32 || this.iv.length !== 16) {
      throw new InternalServerErrorException(
        `A chave AES (${this.key.length} bytes) ou o IV (${this.iv.length} bytes) têm o tamanho incorreto. Verifique se o .env está no formato hexadecimal (64 e 32 caracteres).`,
      );
    }
  }

  /**
   * Criptografa um texto simples (plaintext) usando AES-256-CBC.
   * @param text O texto a ser criptografado (ex: CPF, e-mail).
   * @returns O texto criptografado em formato hexadecimal.
   */
  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);

    // Converte o texto para a codificação 'hex'
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  /**
   * Descriptografa uma string criptografada (ciphertext) para texto simples.
   * @param encryptedText O texto criptografado em formato hexadecimal.
   * @returns O texto simples (plaintext).
   */
  decrypt(encryptedText: string): string {
    // O createDecipheriv precisa da mesma chave e IV
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * Gera um hash SHA-256 não reversível.
   * Usado para a validação de unicidade (emailHash, cpfHash).
   * @param text O texto a ser hasheado (plaintext).
   * @returns Hash SHA-256 em formato hexadecimal (64 caracteres).
   */
  createUniqueHash(text: string): string {
    // Usa o algoritmo SHA-256 (rápido e seguro para unicidade/busca)
    return crypto.createHash('sha256').update(text).digest('hex');
  }

  /**
   * Mascara o nome para exibição em listas (LGPD).
   * @param name Nome completo.
   * @returns Nome mascarado (ex: R**** E****).
   */
  maskName(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);

    return parts
      .map((part) => {
        // Mascara todas as partes, exceto a primeira letra de cada
        if (part.length <= 1) return part;
        return part.charAt(0) + '*'.repeat(part.length - 1);
      })
      .join(' ');
  }

  // const maskName = (name: string): string => {
  //   if (!name) return '';
  //   const parts = name.split(' ');
  //   return parts.length > 1
  //     ? `${parts[0].charAt(0)}**** ${parts[parts.length - 1]}`
  //     : `${name.substring(0, 1)}****`;
  // };
}
