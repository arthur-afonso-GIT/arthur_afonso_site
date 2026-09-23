/*
Tema: Analisador de Texto - Time 5
Integrantes: Arthur Florencio Afonso, Silvio Lobo, Marcos Felipe,
Antônio Marcos, Arthur Cabral, João Gabriel, Vinicius Machado e Lucas Soares
Data: 11/09/2026

Divisao:
Arthur Florencio Afonso - estrutura do programa e funcao main
Silvio Lobo - conversao para minusculas e contagem de caracteres
Marcos Felipe - contagem de palavras
Antônio Marcos - contagem de letras
Arthur Cabral - identificacao da letra mais frequente
João Gabriel - exibicao dos resultados e histogramas
Vinicius Machado - busca sem strstr
Lucas Soares - integracao e testes
*/

#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define LINHAS_TXT 20
#define TAM_LINHA 81
#define LETRAS 26
#define TAM_BUSCA 81

void paraMinusculas(char linha[]);
int contarPalavras(char linha[]);
void contarLetras(char linha[], int destino[]);
char letraMaisFrequente(int freq[][26], int linhas);
int contarCaracteres(char linha[]);
int contemPalavra(char linha[], char palavra[]);
void mostrarHistograma(int frequencia[]);
void mostrarResultados(char texto[][81], int freq[][26], int palavras[], int caracteres[], int linhas);

/*
Responsavel: Silvio Lobo
Proposito: converter os caracteres da linha para minusculas.
Parametro: linha recebida e alterada diretamente. Retorno: nenhum.
*/
void paraMinusculas(char linha[]) {
    int i;
    for (i = 0; linha[i] != '\0'; i++) {
        linha[i] = (char)tolower((unsigned char)linha[i]);
    }
}

/*
Responsavel: Marcos Felipe
Proposito: contar grupos de caracteres separados por espacos.
Parametro: linha analisada. Retorno: quantidade de palavras.
*/
int contarPalavras(char linha[]) {
    int i, total = 0, dentroPalavra = 0;
    for (i = 0; linha[i] != '\0'; i++) {
        if (!isspace((unsigned char)linha[i]) && !dentroPalavra) {
            total++;
            dentroPalavra = 1;
        } else if (isspace((unsigned char)linha[i])) {
            dentroPalavra = 0;
        }
    }
    return total;
}

/*
Responsavel: Silvio Lobo
Proposito: calcular o total de caracteres da linha.
Parametro: linha analisada. Retorno: quantidade de caracteres.
*/
int contarCaracteres(char linha[]) {
    return (int)strlen(linha);
}

/*
Responsavel: Antônio Marcos
Proposito: contar as ocorrencias das letras de a ate z.
Parametros: linha lida e vetor destino, que recebe as frequencias.
*/
void contarLetras(char linha[], int destino[]) {
    int i;
    for (i = 0; i < LETRAS; i++) {
        destino[i] = 0;
    }
    for (i = 0; linha[i] != '\0'; i++) {
        if (linha[i] >= 'a' && linha[i] <= 'z') {
            destino[linha[i] - 'a']++;
        }
    }
}

/*
Responsavel: Arthur Cabral
Proposito: encontrar a letra mais frequente em todas as linhas.
Parametros: matriz de frequencias e total de linhas. Retorno: letra encontrada.
*/
char letraMaisFrequente(int freq[][26], int linhas) {
    int i, j, soma, maior = 0, indice = -1;
    for (j = 0; j < LETRAS; j++) {
        soma = 0;
        for (i = 0; i < linhas; i++) {
            soma += freq[i][j];
        }
        if (soma > maior) {
            maior = soma;
            indice = j;
        }
    }
    return indice == -1 ? '?' : (char)('a' + indice);
}

/*
Responsavel: Vinicius Machado
Proposito: verificar a presenca de uma palavra inteira sem usar strstr.
Parametros: linha e palavra pesquisada. Retorno: 1 se encontrar ou 0 se nao.
*/
int contemPalavra(char linha[], char palavra[]) {
    int i, j, tamanho = (int)strlen(palavra);
    if (tamanho == 0) return 0;
    for (i = 0; linha[i] != '\0'; i++) {
        if (i > 0 && isalnum((unsigned char)linha[i - 1])) continue;
        j = 0;
        while (j < tamanho && linha[i + j] == palavra[j]) j++;
        if (j == tamanho && !isalnum((unsigned char)linha[i + j])) return 1;
    }
    return 0;
}

/*
Responsavel: João Gabriel
Proposito: exibir as frequencias das letras usando barras de asteriscos.
Parametro: vetor de frequencias. Retorno: nenhum. Nao altera o vetor.
*/
void mostrarHistograma(int frequencia[]) {
    int i, j;
    for (i = 0; i < LETRAS; i++) {
        printf("%c: ", 'a' + i);
        for (j = 0; j < frequencia[i]; j++) {
            printf("*");
        }
        printf(" (%d)\n", frequencia[i]);
    }
}

/*
Responsavel: João Gabriel
Proposito: mostrar texto, contagens e histograma de cada linha.
Parametros: textos, frequencias, contagens e total de linhas. Retorno: nenhum.
*/
void mostrarResultados(char texto[][81], int freq[][26], int palavras[], int caracteres[], int linhas) {
    int i;
    for (i = 0; i < linhas; i++) {
        printf("\nLinha %d: %s\n", i + 1, texto[i]);
        printf("Palavras: %d\n", palavras[i]);
        printf("Caracteres: %d\n", caracteres[i]);
        printf("Histograma:\n");
        mostrarHistograma(freq[i]);
    }
}

/*
Responsavel: Arthur Florencio Afonso
Proposito: ler as entradas e coordenar as funcoes do programa.
Retorno: 0 em caso de sucesso e 1 para quantidade de linhas invalida.
Integracao e testes: Lucas Soares. Revisao final: toda a equipe.
*/
int main(void) {
    char texto[LINHAS_TXT][81], busca[TAM_BUSCA];
    int freq[LINHAS_TXT][26], palavras[LINHAS_TXT], caracteres[LINHAS_TXT];
    int linhas, i, linhasEncontradas = 0;

    printf("Quantidade de linhas (1 a %d): ", LINHAS_TXT);
    if (scanf("%d", &linhas) != 1 || linhas < 1 || linhas > LINHAS_TXT) return 1;
    while (getchar() != '\n');
    for (i = 0; i < linhas; i++) {
        printf("Digite a linha %d: ", i + 1);
        fgets(texto[i], TAM_LINHA, stdin);
        texto[i][strcspn(texto[i], "\n")] = '\0';
        paraMinusculas(texto[i]);
        palavras[i] = contarPalavras(texto[i]);
        caracteres[i] = contarCaracteres(texto[i]);
        contarLetras(texto[i], freq[i]);
    }
    mostrarResultados(texto, freq, palavras, caracteres, linhas);
    printf("\nLetra mais frequente: %c\n", letraMaisFrequente(freq, linhas));
    printf("Palavra para pesquisar: ");
    fgets(busca, TAM_BUSCA, stdin);
    busca[strcspn(busca, "\n")] = '\0';
    paraMinusculas(busca);
    for (i = 0; i < linhas; i++) linhasEncontradas += contemPalavra(texto[i], busca);
    printf("Linhas que contem a palavra: %d\n", linhasEncontradas);
    return 0;
}
