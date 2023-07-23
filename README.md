# yahtzee
이 프로젝트를 시작하게 된 이유.  

<img src="https://github.com/Dev-ShinY/study_yahtzee/assets/114058540/ff20bc70-aeaf-4e3b-9135-546f11dddf7e" height="400"/>

```bash
야찌에서 야찌란 주사위 5개를 던져 5개 모두 같은 숫자가 나올 경우,  
50점(그 이후부터는 100점)이라는 큰 점수를 받을 수 있는 극악의 점수입니다.  
한 게임에 1번 나올 확률은 45.80%, 2번은 11.81% 라는 얘기가 있습니다.  
8번 나올 확률이 47,500,000분의 1이고, 이 수치는 로또 1등 당첨 확률보다 낮다고 합니다.  
그런데 이 게임에 극악의 확률이 7번 발생하였습니다.
그 중, 5번 나왔음에도 불구하고 로또를 당첨받지 못해 화가난 개발자는 야찌를 직접 만들기로 합니다.
```

## Tech Stack ) 
- framework : next.js 13
- css framework : tailwind css + clsx
- 상태 관리 라이브러리 : Redux

## 중요 포인트
- [x] 반응형 UI (데스크탑/스마트폰)
- [x] Redux 사용

## 룰
- Aces : 1이 나온 주사위 눈의 합
- Twos : 2가 나온 주사위 눈의 합
- Threes: 3이 나온 주사위 눈의 합 
- Fours : 4가 나온 주사위 눈의 합
- Fives : 5가 나온 주사위 눈의 합
- Sixes : 6이 나온 주사위 눈의 합
- Bonus : 상단항목에서 합이 63점이 넘을 경우 35점을 추가한다.
- Three-Of-A-Kind : 주사위 3개 이상의 눈이 동일할 때, 주사위 5개의 합 
- Four-Of-A-Kind : 주사위 4개 이상의 눈이 동일할 때, 주사위 5개의 합 
- Full House : 동일한 주사위 눈 한 종류가 3개, 다른 종류가 2개일 때, 고정 25점
- Small Straight : 주사위 4개 이상의 눈이 이어지는 수일 때, 고정 30점
- Large Straight : 주사위 5개의 눈이 이어지는 수일 때, 고정 40점
- Chance : 주사위 5개의 눈의 총합
- Yahtzee :  주사위 5개의 눈이 모두 같을 때, 고정 50점

[1라운드 당, 주사위를 3번 돌릴 수 있다]
> ![image](https://github.com/Dev-ShinY/study_yahtzee/assets/114058540/9f34d3e3-c80d-483b-86b7-af44ec5f4bb3)

[목표 점수는 200점이며 초록 게이지를 통해 목표 점수를 쌓는다]
> ![image](https://github.com/Dev-ShinY/study_yahtzee/assets/114058540/e19ed2ea-0607-40ca-8fbd-23ceb9c83777)

## 추후 목표
- [ ] 알고리즘 vs 클라이언트
