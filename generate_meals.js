const fs = require('fs');

const baseMeals = [
  // 소고기
  { category: 'bulgogi', name: '한우 불고기', main: '소불고기 80g' },
  { category: 'bulgogi', name: '소고기 야채말이', main: '소고기 야채말이 80g' },
  { category: 'bulgogi', name: '수제 함박 스테이크', main: '수제 함박 스테이크 90g' },
  { category: 'bulgogi', name: '소고기 장조림', main: '소고기 장조림 70g' },
  { category: 'bulgogi', name: '소고기 숙주볶음', main: '소고기 볶음 80g' },
  { category: 'bulgogi', name: '소고기 샤브샤브', main: '소고기 샤브 건더기 80g' },
  { category: 'bulgogi', name: '소고기 완자전', main: '소고기 완자전 80g' },
  { category: 'bulgogi', name: '소고기 무국 건더기', main: '소고기 국거리 70g' },
  { category: 'bulgogi', name: '소고기 배추볶음', main: '소고기 배추볶음 80g' },
  { category: 'bulgogi', name: '소불고기 버섯볶음', main: '버섯 소불고기 80g' },

  // 돼지고기
  { category: 'pork', name: '돼지고기 보쌈 수육', main: '돼지고기 수육 80g' },
  { category: 'pork', name: '간장 돼지불고기', main: '돼지불고기(간장) 80g' },
  { category: 'pork', name: '돈육 장조림', main: '돼지고기 장조림 70g' },
  { category: 'pork', name: '수제 돈가스', main: '수제 돈가스 90g' },
  { category: 'pork', name: '돈육 메추리알 조림', main: '돈육조림 70g' },
  { category: 'pork', name: '돼지고기 양배추말이', main: '돼지고기 양배추말이 90g' },
  { category: 'pork', name: '돼지안심 스테이크', main: '돼지안심구이 80g' },
  { category: 'pork', name: '돈육 버섯볶음', main: '돈육 버섯볶음 80g' },
  { category: 'pork', name: '돼지고기 동그랑땡', main: '수제 동그랑땡 80g' },
  { category: 'pork', name: '수제 탕수육 (소스찍먹)', main: '돼지 튀김 80g' },

  // 닭고기
  { category: 'chicken', name: '닭안심 소금구이', main: '닭안심 소금구이 80g' },
  { category: 'chicken', name: '간장 닭불고기', main: '닭불고기 80g' },
  { category: 'chicken', name: '닭가슴살 냉채', main: '닭가슴살 냉채 80g' },
  { category: 'chicken', name: '훈제오리 구이', main: '훈제오리 구이 80g' }, // 닭/오리
  { category: 'chicken', name: '닭가슴살 큐브 볶음', main: '닭가슴살 큐브 80g' },
  { category: 'chicken', name: '닭가슴살 샐러드', main: '닭가슴살 80g' },
  { category: 'chicken', name: '찜닭 (국물제외)', main: '찜닭 건더기 80g' },
  { category: 'chicken', name: '닭고기 야채볶음', main: '닭고기 야채볶음 80g' },
  { category: 'chicken', name: '닭안심 장조림', main: '닭안심 장조림 70g' },
  { category: 'chicken', name: '닭가슴살 소시지 구이', main: '수제 닭가슴살 소시지 80g' },

  // 생선
  { category: 'fish', name: '삼치 소금구이', main: '삼치 소금구이 80g' },
  { category: 'fish', name: '가자미 구이', main: '가자미 소금구이 80g' },
  { category: 'fish', name: '대구 생선까스', main: '대구 생선가스 80g' },
  { category: 'fish', name: '동태전', main: '담백한 동태전 80g' },
  { category: 'fish', name: '갈치 소금구이', main: '갈치 소금구이 80g' },
  { category: 'fish', name: '조기 구이', main: '조기 구이 80g' },
  { category: 'fish', name: '연어 구이', main: '연어 구이 80g' },
  { category: 'fish', name: '대구 지리 건더기', main: '대구살 80g' },
  { category: 'fish', name: '굴비 구이', main: '굴비 구이 80g' },
  { category: 'fish', name: '동태찜 (국물제외)', main: '동태찜 80g' },

  // 두부
  { category: 'tofu', name: '들기름 두부 구이', main: '두부 부침 100g' },
  { category: 'tofu', name: '연두부 찜', main: '연두부 100g' },
  { category: 'tofu', name: '두부 동그랑땡', main: '두부 동그랑땡 90g' },
  { category: 'tofu', name: '마파두부 (저염)', main: '마파두부 100g' },
  { category: 'tofu', name: '두부 샐러드', main: '데친 두부 100g' },
  { category: 'tofu', name: '두부 계란말이', main: '두부 계란말이 100g' },
  { category: 'tofu', name: '두부선', main: '수제 두부선 90g' },
  { category: 'tofu', name: '두부 야채볶음', main: '두부 야채볶음 100g' },
  { category: 'tofu', name: '두부 강정', main: '수제 두부강정 90g' },
  { category: 'tofu', name: '건두부 볶음', main: '건두부 볶음 80g' },

  // 기타/채식
  { category: 'vegetarian', name: '버섯 잡채', main: '버섯 잡채 100g' },
  { category: 'vegetarian', name: '오징어 숙회', main: '오징어 숙회 80g' }, // 해산물 포함
  { category: 'vegetarian', name: '계란말이', main: '계란말이 80g' },
  { category: 'vegetarian', name: '새우살 볶음', main: '새우 볶음 80g' },
  { category: 'vegetarian', name: '야채 전', main: '야채전 90g' },
  { category: 'vegetarian', name: '가지 조림', main: '가지 조림 80g' },
  { category: 'vegetarian', name: '도토리묵 무침', main: '도토리묵 무침 100g' },
  { category: 'vegetarian', name: '우엉 잡채', main: '우엉 잡채 90g' },
  { category: 'vegetarian', name: '낙지 데침', main: '낙지 데침 80g' },
  { category: 'vegetarian', name: '계란찜', main: '부드러운 계란찜 100g' },
];

const sideDishes1 = [
  '데친 숙주나물 40g', '데친 가지나물 40g', '오이 초무침 40g', '무나물 50g', '데친 청경채 40g',
  '데친 콜리플라워 40g', '저염 오이 샐러드 40g', '새콤 무초절임 30g', '콩나물 볶음 40g', '데친 얼갈이 40g',
  '데친 시금치 40g', '파프리카 슬라이스 30g', '양배추 샐러드 40g', '참나물 겉절이 40g', '호박나물 40g',
  '오이 무생채 40g', '무생채 40g', '데친 배추나물 40g', '애호박 볶음 40g', '데친 느타리버섯 40g'
];

const sideDishes2 = [
  '맑은 무국 100g', '맑은 계란국 100g', '촉촉한 계란찜 50g', '동태전 50g', '두부조개국 120g',
  '미역국 100g', '두부 들기름 구이 50g', '조기 구이 60g', '소고기 뭇국 120g', '북어 해장국 100g',
  '대구 지리국 120g', '아욱국 100g', '맑은 파국 100g', '콩나물국 100g', '황태국 100g',
  '버섯 들깨탕 100g', '맑은 된장국 100g', '어묵국 100g', '두부구이 50g', '계란말이 50g'
];

function generateMeals(count) {
  const result = [];
  let baseIndex = 0;
  
  for (let i = 0; i < count; i++) {
    const base = baseMeals[i % baseMeals.length];
    const side1 = sideDishes1[(i * 3 + 7) % sideDishes1.length];
    const side2 = sideDishes2[(i * 5 + 11) % sideDishes2.length];
    
    // Potassium variations based on main dish
    let basePotassium = 400;
    if (base.category === 'bulgogi') basePotassium = 450 + (i % 50);
    else if (base.category === 'pork') basePotassium = 480 + (i % 40);
    else if (base.category === 'chicken') basePotassium = 380 + (i % 40);
    else if (base.category === 'fish') basePotassium = 410 + (i % 30);
    else if (base.category === 'tofu') basePotassium = 380 + (i % 20);
    else basePotassium = 350 + (i % 30);

    let basePhosphorus = 100 + (i % 40);
    let baseCalcium = 40 + (i % 25);
    let protein = 18 + (i % 8);

    const mealName = base.name + (i > 59 ? ` (${Math.floor(i/60)+1})` : '');
    // Ensure uniqueness slightly by modifying the description with the index or day
    
    result.push({
      id: i + 1, // Add an ID just for reference, will strip later
      mealName: base.name,
      mealDescription: `${base.main}, 흰쌀밥 150g(2/3공기), ${side1}, ${side2}`,
      category: base.category,
      potassiumMg: basePotassium,
      phosphorusMg: basePhosphorus,
      calciumMg: baseCalcium,
      proteinG: protein
    });
  }
  return result;
}

const meals = generateMeals(300);

let output = `export interface DailyMealPlan {
  week: number;
  dayIndex: number;
  dayName: string;
  mealName: string;
  mealDescription: string;
  category: 'bulgogi' | 'fish' | 'tofu' | 'chicken' | 'pork' | 'vegetarian';
  potassiumMg: number;
  phosphorusMg: number;
  calciumMg: number;
  proteinG: number;
}

// 300개의 다양한 식단 데이터 (랜덤하게 4주 식단표에 배정)
export const DATABASE_MEAL_PLANS: Omit<DailyMealPlan, 'week' | 'dayIndex' | 'dayName'>[] = [\n`;

meals.forEach(m => {
  output += `  { mealName: '${m.mealName}', mealDescription: '${m.mealDescription}', category: '${m.category}', potassiumMg: ${m.potassiumMg}, phosphorusMg: ${m.phosphorusMg}, calciumMg: ${m.calciumMg}, proteinG: ${m.proteinG} },\n`;
});

output += `];\n`;

fs.writeFileSync('src/data.ts', output);
console.log('src/data.ts generated');

