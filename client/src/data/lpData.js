const lpData = [
  {
  id: 'lp001',
  title: '장미꽃 [1집]',
  artist: '코코 (CoCo)',
  album: '장미꽃',
  genre: '인디',
  releaseDate: '2025-06-01',
  edition: '한정판',
  thumbnail: '/images/home1.jp',
  audioUrl: '/audios/rose.mp3',
  duration: '4분 14초',
  playCount: 4500,
  price: 50000,
  shipping: 2500,
  shippingInfo: '기본 2500원 (제주/도서 산간 추가)',
  rank_audio: 1,
  rank_sale: 1,

  // 트랙 리스트
  tracks: [
    {
      side: 'A',
      list: [
        { title: '장미꽃', artist: '코코', time: '3:24' },
        { title: '그날의 바람', artist: '코코', time: '4:12' },
        { title: 'Everything Happens To Me', artist: '코코', time: '3:50' },
      ]
    },
    {
      side: 'B',
      list: [
        { title: '잊혀진 노래', artist: '코코', time: '3:30' },
        { title: '밤의 재회', artist: '코코', time: '4:20' }
      ]
    }
  ],

  // 페이지별 사용되는 상세 설명
  description_audio: '2025년 LP 음원 중 가장 많이 플레이된 곡',
  description_sale: '2025년 12월 한정 발매된 LP - 장미꽃',

  // 디테일 페이지 본문용 텍스트
  notice: `- 본 상품은 예약 판매 상품입니다.
- 주문 후 단순 변심, 주소지 오입력에 따른 교환/반품은 불가합니다.
- 상품은 별도 포장되어 배송됩니다.`,

  trackInfo: `Side A
1. 장미꽃 – 강렬한 감성을 자극하는 대표 곡
2. 그날의 바람 – 재즈풍의 서정적 멜로디
3. Everything Happens To Me – 이별의 정서를 그려낸 발라드

Side B
1. 잊혀진 노래 – 몽환적인 피아노와 코코 특유의 목소리
2. 밤의 재회 – 잔잔한 스트링과 속삭이듯 부르는 보컬`,

  // 조건부 렌더링 제어용 필드
  showInChart: true,
  showInList: true,
  showAudioButton: true,
  showPurchaseButton: true
},
  {
    id: 'lp002',
    title: '푸른 밤의 노래',
    artist: '이솔',
    album: '푸른 밤',
    genre: '재즈',
    releaseDate: '2025-05-10',
    edition: '초판',
    thumbnail: '/images/blue-night.jpg',
    audioUrl: '/audios/blue-night.mp3',
    duration: '5분 02초',
    playCount: 3600,
    price: 47000,
    shipping: 2500,
    shippingInfo: '기본 2500원 (제주/도서 산간 추가)',
    rank_audio: 3,
    rank_sale: 2,

    tracks: [
      {
        side: 'A',
        list: [
          { title: '푸른 밤', artist: '이솔', time: '4:10' },
          { title: '비 오는 거리', artist: '이솔', time: '3:45' },
          { title: 'Autumn Whisper', artist: '이솔', time: '4:23' },
        ]
      },
      {
        side: 'B',
        list: [
          { title: '달빛 속으로', artist: '이솔', time: '4:05' },
          { title: '고요한 새벽', artist: '이솔', time: '5:00' }
        ]
      }
    ],

    description_audio: '잔잔한 밤의 감성을 담은 재즈 명곡',
    description_sale: '비 오는 날 듣기 좋은 감성 재즈 LP',

    notice: `- 이 앨범은 한정 수량으로 제작되었습니다.
- 커버 디자인은 변경될 수 있습니다.
- 단순 변심으로 인한 환불은 불가합니다.`,

    trackInfo: `Side A
1. 푸른 밤 – 차분한 피아노와 색소폰의 조화
2. 비 오는 거리 – 빗소리를 닮은 재즈 리듬
3. Autumn Whisper – 가을의 속삭임을 담은 연주곡

Side B
1. 달빛 속으로 – 몽환적인 보컬과 부드러운 멜로디
2. 고요한 새벽 – 하루의 끝을 정리하는 잔잔한 곡`,

    showInChart: true,
    showInList: true,
    showAudioButton: true,
    showPurchaseButton: true
  },

  {
    id: 'lp003',
    title: '사랑의 회전목마',
    artist: '레이라 (Leira)',
    album: '회전',
    genre: '클래식',
    releaseDate: '2025-04-20',
    edition: '리미티드 에디션',
    thumbnail: '/images/carousel.jpg',
    audioUrl: '/audios/carousel-love.mp3',
    duration: '3분 58초',
    playCount: 5200,
    price: 52000,
    shipping: 3000,
    shippingInfo: '3000원 (제주/도서 산간 4000원 추가)',
    rank_audio: 2,
    rank_sale: 4,

    tracks: [
      {
        side: 'A',
        list: [
          { title: '사랑의 회전목마', artist: '레이라', time: '3:40' },
          { title: '꿈속의 너', artist: '레이라', time: '4:05' },
          { title: '초콜릿', artist: '레이라', time: '3:35' },
        ]
      },
      {
        side: 'B',
        list: [
          { title: '첫 만남', artist: '레이라', time: '3:50' },
          { title: 'Goodbye Carousel', artist: '레이라', time: '4:10' }
        ]
      }
    ],

    description_audio: '사랑을 테마로 한 레트로 팝 스타일 음반',
    description_sale: '아날로그 감성으로 재해석된 현대 팝 앨범',

    notice: `- 포스터 및 스티커 세트 포함
- 미개봉 시에만 반품 가능
- 배송은 결제일 기준 3일 이내 발송`,

    trackInfo: `Side A
1. 사랑의 회전목마 – 중독성 있는 후렴과 상큼한 리듬
2. 꿈속의 너 – 잔잔한 기타와 감미로운 목소리
3. 초콜릿 – 달콤한 사랑을 그린 귀여운 팝 트랙

Side B
1. 첫 만남 – 설렘 가득한 감정선
2. Goodbye Carousel – 회전목마처럼 반복되는 이별의 감정`,

    showInChart: true,
    showInList: true,
    showAudioButton: true,
    showPurchaseButton: true
  },

  {
    id: 'lp004',
    title: '도시의 그림자',
    artist: '민후',
    album: 'City Light',
    genre: '시티팝',
    releaseDate: '2025-03-18',
    edition: '정규 2집',
    thumbnail: '/images/citylight.jpg',
    audioUrl: '/audios/city-shadow.mp3',
    duration: '4분 40초',
    playCount: 2800,
    price: 49000,
    shipping: 2500,
    shippingInfo: '배송비 2500원, 도서산간 3000원 추가',

    rank_audio: 4,
    rank_sale: 3,

    tracks: [
      {
        side: 'A',
        list: [
          { title: '도시의 그림자', artist: '민후', time: '4:00' },
          { title: 'Night Drive', artist: '민후', time: '4:50' },
          { title: 'Rainy Seoul', artist: '민후', time: '4:20' },
        ]
      },
      {
        side: 'B',
        list: [
          { title: '혼자 걷는 거리', artist: '민후', time: '3:55' },
          { title: '퇴근길', artist: '민후', time: '4:35' }
        ]
      }
    ],

    description_audio: '서울 밤거리를 떠올리게 하는 감성 R&B',
    description_sale: '퇴근길 위로를 주는 어반 R&B 컬렉션',

    notice: `- 고음질 180g 블랙 바이닐
- 한정 포스터 포함
- 전곡 디지털 코드 동봉`,

    trackInfo: `Side A
1. 도시의 그림자 – 퇴근길, 네온사인 아래의 감정
2. Night Drive – 드라이브하며 듣기 좋은 무드
3. Rainy Seoul – 빗속의 감성 보컬

Side B
1. 혼자 걷는 거리 – 이별 후의 공허함을 담은 트랙
2. 퇴근길 – 하루를 마무리하는 따뜻한 위로`,

    showInChart: true,
    showInList: true,
    showAudioButton: true,
    showPurchaseButton: true
  },

  {
    id: 'lp005',
    title: '달의 노래',
    artist: '유나 (Yuna)',
    album: 'Moonlight',
    genre: '인디',
    releaseDate: '2025-02-12',
    edition: '화이트 에디션',
    thumbnail: '/images/moonlight.jpg',
    audioUrl: '/audios/moon-song.mp3',
    duration: '3분 48초',
    playCount: 3400,
    price: 53000,
    shipping: 3000,
    shippingInfo: '기본 3000원 (제주도 +1500원)',

    rank_audio: 5,
    rank_sale: 5,

    tracks: [
      {
        side: 'A',
        list: [
          { title: '달의 노래', artist: '유나', time: '3:50' },
          { title: '별빛의 고요함', artist: '유나', time: '4:15' },
          { title: '조용한 밤', artist: '유나', time: '3:40' },
        ]
      },
      {
        side: 'B',
        list: [
          { title: '잠 못 드는 달빛', artist: '유나', time: '4:05' },
          { title: '그림자의 춤', artist: '유나', time: '4:00' }
        ]
      }
    ],

    description_audio: '달빛처럼 잔잔하고 따뜻한 어쿠스틱 멜로디',
    description_sale: '화이트 컬러 바이닐 한정 발매 음반',

    notice: `- 화이트 컬러 디스크
- 친환경 패키징 사용
- 교환/환불은 미개봉 시에만 가능`,

    trackInfo: `Side A
1. 달의 노래 – 달빛 아래 속삭이는 듯한 보컬
2. 별빛의 고요함 – 별이 쏟아지는 밤하늘처럼 평온한 곡
3. 조용한 밤 – 기타와 함께하는 힐링 사운드

Side B
1. 잠 못 드는 달빛 – 수면 전 듣기 좋은 곡
2. 그림자의 춤 – 밤의 그림자처럼 부드럽게 흐르는 리듬`,

    showInChart: true,
    showInList: true,
    showAudioButton: true,
    showPurchaseButton: true
  },

  {
    id: 'lp006',
    title: '깊은 숲의 속삭임',
    artist: '하린 (Harin)',
    album: 'Forest Voice',
    genre: '클래식',
    releaseDate: '2025-01-08',
    edition: '에코 패키지',
    thumbnail: '/images/forest.jpg',
    audioUrl: '/audios/forest-whisper.mp3',
    duration: '4분 20초',
    playCount: 3900,
    price: 48000,
    shipping: 2000,
    shippingInfo: '기본 2000원 (추가 요금 없음)',

    rank_audio: 6,
    rank_sale: 6,

    tracks: [
      {
        side: 'A',
        list: [
          { title: '숲의 속삭임', artist: '하린', time: '4:20' },
          { title: '흙냄새 가득한 길', artist: '하린', time: '4:00' },
          { title: '숨결', artist: '하린', time: '3:55' },
        ]
      },
      {
        side: 'B',
        list: [
          { title: '파란 잎', artist: '하린', time: '4:10' },
          { title: '오솔길에서', artist: '하린', time: '3:50' }
        ]
      }
    ],

    description_audio: '자연의 소리와 감성이 어우러진 포크 명반',
    description_sale: '지속 가능한 소재로 제작된 환경 친화 LP',

    notice: `- 친환경 종이 사용
- 패키지 인쇄 최소화
- 전곡 자연 환경 사운드 포함`,

    trackInfo: `Side A
1. 숲의 속삭임 – 바람, 새소리, 기타의 어우러짐
2. 흙냄새 가득한 길 – 자연의 향기를 담은 포크 트랙
3. 숨결 – 삶과 자연의 연결을 이야기하는 곡

Side B
1. 파란 잎 – 이슬 맺힌 잎사귀처럼 맑고 투명한 선율
2. 오솔길에서 – 숲길을 걷는 듯한 평화로운 사운드`,

    showInChart: true,
    showInList: true,
    showAudioButton: true,
    showPurchaseButton: true
  }
];
