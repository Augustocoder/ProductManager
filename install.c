#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <locale.h>
#include <conio.h>
int main()
{
    setlocale(LC_ALL, "portuguese");
    printf("\nIniciando a instala��o dos pacotes de deped�ncia\n\n");
    printf("Caso ocorra um erro, pode ser que voc� n�o tenha o Node.JS instalado!\n\n");
    system(" npm i --save-dev ");
    system("npm i --save-dev @types/express");
    system("npm i --save-dev fs");
    system("npm i --save-dev zod");

    printf("Instala��o conclu�da com sucesso!\n");
    printf("Pressione qualquer tecla para fechar!\n");

    getch();
}
