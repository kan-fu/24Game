# 24 Game and Solver

[![Netlify Status](https://api.netlify.com/api/v1/badges/1aa7d940-0be9-44ef-820f-4bb805265aca/deploy-status)](https://app.netlify.com/sites/24game/deploys)

A [24 game](https://en.wikipedia.org/wiki/24_Game) app powered by React and Material UI. Enjoy a moment of mental arithmetic and fast thinking. But be warned, these problems are not as easy as they seem!

## Description

The app contains two modes. 

  1. **24 Game**. You are given 4 numbers. Find a way to get the result of 24 by only using plus (+), minus (-), multiplication (\*), division (/) and parentheses. There are 30 problems in total (which I find a bit challenging and may involve smart division).  

  2. **24 Solver**. You can type 4 numbers manually or generate four random numbers. The generated numbers are integers from 1 to 13 and there is no guarantee of a solution.

Also the app has a dark mode. Try it out!

## Algorithm

Brute force algorithm

Consider a legitmate solution `6 + (3 + 6) * 2` and how to brute force search this pattern. There are three parts in this solution:
1. Operands. There are 4 operands in the solution. Total possible cases are `4! = 24` if all the four numbers are distinct (a,b,c,d), or `4! / 2 = 12` if two of them are identical (a,a,b,c), or `4! / (2*2) = 6` if they are two groups of two identical numbers (a,a,b,b), or `4! / 3! = 4` if three of them are identical (a,a,a,b), or 1 if four of them are identical (a,a,a,a). This is called [Permutations with Repetition](https://brilliant.org/wiki/permutations-with-repetition/).
2. Operators. There are 3 operators in the solution. Operators consist of `+-*/`. According to [Rule of product](https://en.wikipedia.org/wiki/Rule_of_product), the number of total possible cases is `4**3 = 64`.
3. Parentheses. There are actually 5 cases in total. Let F(n) denote the total number of cases given n operands. So `F(3) = 2` and `F(4) = 5`. Switching from F(n-1) to F(n), we can think about how the nth element interact with the previous n-1 operands. Consider calculating F(4) `(a,b,c,d)` from F(3) `(a,b,c)`
   - If d adds c (the first two cases below), then F(4) deteriorates to F(3) because c+d can be regarded as one number. 
   - If d does not add c (the last three cases below), then we can add d to every case in F(3) to make F(4), but there are still cases that does not belong to the above scenario when part of the F(3) can interact with d. In the third case below, `b + c` in F(3) interact with `d` before engaging `a`. So `F(n) > 2F(n-1)`, and `2**(n-2)` should be a solid guess of complexity.
```
    (a + b) + (c + d)
    a + (b + (c + d))
    a + ((b + c) + d)
    ((a + b) + c) + d
    (a + (b + c)) + d
    // The + sign is just a binary operation (similar in group theory) 
```
Enumerate all the combinations, we know that the time complexity of the brute force algorithm should be `O(n! * 4**(n-1) * 2**(n-2))` given that the number of operands  is `n`. When n equals 4, this algorithm is acceptable.
