#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <locale.h>
#include <conio.h>
int main()
{
    setlocale(LC_ALL, "portuguese");
    system("npm run build");
    system("npm run start");

}
