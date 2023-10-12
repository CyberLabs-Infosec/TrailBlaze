#include<stdio.h>

int main(){
    char flag[] = "*********";
    int a, b;

    printf("Adding two positive integers gives negative answer. Why? Enter numbers here");
    scanf("%d", &a);
    scanf("%d", &b);
    
    if (a < 0 || b < 0){
        printf("Hehe! You can't trick me, Only postive numbers allowed!");
    } else if ((a+b) == -5000){
        printf("System repair initiated. Here is your reward: %s", flag);
    } else {
        printf("Sensors are high on coolant. REPAIR ASAP! your result is %d", a+b);
    }

    return 0;
}