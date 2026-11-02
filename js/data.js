/* 시안용 예시 데이터 — 상품·후기·퀴즈는 실제 API/확정 문구로 교체 */
window.LANDING_DATA = {
  scenes: [
    { src: 'assets/img/colo.jpg', alt: '해 질 녘 로마 콜로세움으로 이어지는 돌길', caption: '오후 6:20 · 로마 콜로세움', pos: 'center 60%' },
    { src: 'assets/img/fuji.jpg', alt: '벚꽃 너머로 보이는 후지산과 오층탑', caption: '오전 10:15 · 후지요시다', pos: 'center 30%' },
    { src: 'assets/img/taj.jpg', alt: '수로에 비친 타지마할', caption: '오전 7:30 · 아그라 타지마할', pos: 'center 40%' }
  ],

  worries: ['쇼핑센터에 끌려가면?', '가이드 팁은 얼마나?', '호텔이 시내에서 멀면?', '일정이 바뀌면?'],

  compare: [
    { label: '쇼핑', old: '단체 쇼핑 일정', now: '단체 쇼핑 없음' },
    { label: '팁', old: '현지에서 따로 지불', now: '가이드·기사 경비 포함' },
    { label: '숙소', old: '시 외곽 호텔', now: '시내 중심 호텔' },
    { label: '식사', old: '단체 식당 위주', now: '현지 맛집' },
    { label: '인원', old: '40명 안팎 대형 단체', now: '소규모 그룹 출발 (가안)' }
  ],

  styles: [
    { name: '다섯팩 2.0', desc: '쇼핑 없이, 경비 포함으로 편하게', img: 'ph-fuji', products: [
      { name: '다섯팩 2.0 도쿄·후지산 4일', date: '2027.03.14', rating: '4.8 (1,284)', price: '899,000', img: 'ph-fuji', caption: '오전 10:15 · 후지요시다' },
      { name: '다섯팩 2.0 로마·피렌체 9일', date: '2027.04.05', rating: '4.9 (418)', price: '3,290,000', img: 'ph-colo', caption: '오후 6:20 · 로마' },
      { name: '다섯팩 2.0 스위스 일주 8일', date: '2027.05.10', rating: '4.8 (356)', price: '4,590,000', img: 'ph-swiss', caption: '오전 7:20 · 알프스 마을' } ] },
    { name: '밍글링 투어', desc: '취향 같은 2030과 함께', img: 'ph-colo', products: [
      { name: '밍글링 로마 미식 클래스 6일', date: '2027.03.21', rating: '4.7 (212)', price: '2,190,000', img: 'ph-colo', caption: '오후 7:40 · 트라스테베레' },
      { name: '밍글링 교토 사진 산책 4일', date: '2027.04.02', rating: '4.8 (305)', price: '1,090,000', img: 'ph-fuji', caption: '오전 9:40 · 산넨자카' },
      { name: '밍글링 카이로 사막 캠프 7일', date: '2027.02.18', rating: '4.6 (98)', price: '2,690,000', img: 'ph-giza', caption: '오후 5:10 · 기자' } ] },
    { name: '우리끼리', desc: '우리 일행만 단독으로', img: 'ph-taj', products: [
      { name: '우리끼리 인도 골든 트라이앵글 7일', date: '2027.02.10', rating: '4.7 (141)', price: '2,390,000', img: 'ph-taj', caption: '오전 7:30 · 아그라' },
      { name: '우리끼리 스위스 가족 8일', date: '2027.06.12', rating: '4.9 (87)', price: '5,290,000', img: 'ph-swiss', caption: '오후 3:20 · 알프스 마을' },
      { name: '우리끼리 오사카·교토 4일', date: '2027.03.01', rating: '4.8 (622)', price: '1,190,000', img: 'ph-fuji', caption: '오후 1:00 · 니시키 시장' } ] },
    { name: '내맘대로', desc: '일정은 내가 고르고', img: 'ph-swiss', products: [
      { name: '내맘대로 스위스 레일 6일', date: '매일 출발', rating: '4.7 (203)', price: '2,890,000', img: 'ph-swiss', caption: '오전 8:10 · 알프스 마을' },
      { name: '내맘대로 로마 자유 5일', date: '매일 출발', rating: '4.6 (377)', price: '1,590,000', img: 'ph-colo', caption: '오후 6:20 · 로마' },
      { name: '내맘대로 도쿄 자유 4일', date: '매일 출발', rating: '4.7 (1,022)', price: '690,000', img: 'ph-fuji', caption: '오전 10:15 · 후지요시다' } ] },
    { name: '프리미엄', desc: '한 단계 위의 여유', img: 'ph-giza', products: [
      { name: '프리미엄 이집트 나일 크루즈 9일', date: '2027.03.08', rating: '4.9 (64)', price: '6,890,000', img: 'ph-giza', caption: '오후 5:10 · 기자' },
      { name: '프리미엄 인도 궁전 호텔 8일', date: '2027.02.25', rating: '4.8 (51)', price: '5,990,000', img: 'ph-taj', caption: '오전 7:30 · 아그라' },
      { name: '프리미엄 스위스 그랜드 10일', date: '2027.06.20', rating: '4.9 (73)', price: '8,490,000', img: 'ph-swiss', caption: '오전 7:20 · 알프스 마을' } ] }
  ],

  questions: [
    { q: '연차가 생기면 가장 먼저 하는 일은?', opts: ['가고 싶던 맛집 리스트 정리', '지도 앱에서 골목 구경', '친구·가족 단톡방에 공유', '일단 푹 쉴 숙소 검색'] },
    { q: '여행 첫날 오후, 당신은?', opts: ['저장해 둔 맛집부터 간다', '일단 골목을 걷는다', '일행과 같이 현지 투어에 합류', '숙소에서 쉬며 내일을 계획한다'] },
    { q: '여행 사진 앨범에 가장 많은 것은?', opts: ['음식', '골목과 풍경', '함께 간 사람들', '호텔과 수영장'] },
    { q: '이것만은 포기 못 해!', opts: ['현지 맛집', '자유 시간', '일행과의 추억', '편안한 숙소'] },
    { q: '내 여행을 한 단어로?', opts: ['미식', '탐험', '함께', '여유'] }
  ],

  types: [
    { name: '미식 수집가', desc: '여행의 기억은 늘 맛으로 남는 타입. 현지 맛집이 일정에 들어간 다섯팩이 잘 맞아요.', style: '다섯팩 2.0', styleIdx: 0, img: 'ph-colo' },
    { name: '골목 탐험가', desc: '지도보다 발길을 믿는 타입. 큰 동선은 맡기고, 자유 시간에 골목을 누비세요.', style: '내맘대로', styleIdx: 3, img: 'ph-swiss' },
    { name: '함께라서 여행가', desc: '누구와 가느냐가 제일 중요한 타입. 우리 일행만 다니는 단독 여행을 추천해요.', style: '우리끼리', styleIdx: 2, img: 'ph-taj' },
    { name: '느긋한 휴양가', desc: '쉬러 떠나는 여행이 진짜 여행인 타입. 숙소와 동선이 여유로운 프리미엄이 어울려요.', style: '프리미엄', styleIdx: 4, img: 'ph-fuji' }
  ],

  chips: ['연차 3일, 가까운 해외 어디가 좋을까?', '부모님과 갈 쇼핑 없는 패키지는?', '혼자 가도 어색하지 않은 투어 있어?'],

  aiPlan: {
    title: '교토 3일 · 쇼핑 없는 골목 여행',
    days: [
      [ { time: '오전 9:40', place: '산넨자카', what: '골목 산책과 말차 한 잔' }, { time: '오후 1:00', place: '니시키 시장', what: '현지 맛집에서 점심' }, { time: '오후 7:30', place: '폰토초', what: '강변 골목에서 저녁' } ],
      [ { time: '오전 8:30', place: '후시미 이나리', what: '사람 적은 아침의 도리이 길' }, { time: '오후 12:30', place: '우지', what: '녹차 거리에서 점심' }, { time: '오후 6:00', place: '기온', what: '골목 저녁 산책' } ],
      [ { time: '오전 10:00', place: '아라시야마', what: '대나무 숲 산책' }, { time: '오후 1:00', place: '강변 카페', what: '느긋한 점심과 휴식' }, { time: '오후 4:00', place: '간사이 공항', what: '전용 차량으로 이동' } ]
    ]
  },

  reviews: [
    { img: 'ph-fuji', alt: '벚꽃과 후지산', caption: '오전 10:15 · 후지요시다', head: '★ 5.0 · 다섯팩 2.0 도쿄·후지산', text: '쇼핑 일정이 없어서 하루가 온전히 제 것이었어요.', by: '@trip_minji · 2026년 10월 (예시)' },
    { img: 'ph-colo', alt: '노을 진 콜로세움', caption: '오후 6:20 · 로마', head: '#나답게다섯투어', text: '콜로세움 앞 노을, 가이드님이 알려준 시간 그대로.', by: '@walk_rome · 인스타그램 (예시)' },
    { img: 'ph-swiss', alt: '스위스 산골 마을', caption: '오전 7:20 · 알프스 마을', head: '★ 4.9 · 다섯팩 2.0 스위스 일주', text: '시내 중심 호텔이라 아침 산책이 쉬웠어요.', by: '@slow_alps · 2026년 9월 (예시)' },
    { img: 'ph-taj', alt: '타지마할', caption: '오전 7:30 · 아그라', head: '★ 4.8 · 우리끼리 인도 7일', text: '우리 가족만 다녀서 부모님도 편하셨어요.', by: '@hana_family · 2026년 8월 (예시)' },
    { img: 'ph-giza', alt: '기자 피라미드', caption: '오후 5:10 · 기자', head: '#나답게다섯투어', text: '팁 걱정 없이 사막 노을만 보면 됐던 날.', by: '@desert_sun · 인스타그램 (예시)' },
    { img: 'ph-colo', alt: '로마 돌길', caption: '오후 8:00 · 트라스테베레', head: '★ 4.7 · 밍글링 로마 미식', text: '취향 같은 사람들과 먹고 걷는 일주일이었어요.', by: '@pasta_lover · 2026년 7월 (예시)' }
  ],

  qrPattern: '1110111100101110101011011100101100110101111000100110111101010110110110111'
};
