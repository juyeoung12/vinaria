const lpData = {
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
};
