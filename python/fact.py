#!/usr/bin/env python3

def factorial(n):
    z=1
    if n>1:
        z=n*factorial(n-1)
    return z

print(factorial(100))