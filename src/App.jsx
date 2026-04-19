import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Settings, Languages, Play, PenTool, Info } from 'lucide-react';

// ==========================================
// 題庫資料 (大家的日本語 初級 I - 第 1~12 課)
// ==========================================
const VOCAB_DATA = [
  // 第 1 課
  { id: 1, lesson: 1, jp: 'わたし', kanji: '私', zh: '我' },
  { id: 2, lesson: 1, jp: 'あなた', kanji: '', zh: '你' },
  { id: 3, lesson: 1, jp: 'あのひと', kanji: 'あの人', zh: '那個人' },
  { id: 4, lesson: 1, jp: 'あのかた', kanji: 'あの方', zh: '那位 (那個人的禮貌形)' },
  { id: 5, lesson: 1, jp: 'せんせい', kanji: '先生', zh: '老師、教導者' },
  { id: 6, lesson: 1, jp: 'きょうし', kanji: '教師', zh: '教師 (指自己的職業)' },
  { id: 7, lesson: 1, jp: 'がくせい', kanji: '学生', zh: '學生' },
  { id: 8, lesson: 1, jp: 'かいしゃいん', kanji: '会社員', zh: '公司職員' },
  { id: 9, lesson: 1, jp: 'しゃいん', kanji: '社員', zh: '～公司的職員' },
  { id: 10, lesson: 1, jp: 'ぎんこういん', kanji: '銀行員', zh: '銀行員' },
  { id: 11, lesson: 1, jp: 'いしゃ', kanji: '医者', zh: '醫生' },
  { id: 12, lesson: 1, jp: 'けんきゅうしゃ', kanji: '研究者', zh: '研究員' },
  { id: 13, lesson: 1, jp: 'エンジニア', kanji: '', zh: '工程師' },
  { id: 14, lesson: 1, jp: 'だいがく', kanji: '大学', zh: '大學' },
  { id: 15, lesson: 1, jp: 'びょういん', kanji: '病院', zh: '醫院' },
  { id: 16, lesson: 1, jp: 'でんき', kanji: '電気', zh: '電、電燈' },
  { id: 17, lesson: 1, jp: 'だれ', kanji: '', zh: '誰' },
  { id: 18, lesson: 1, jp: 'どなた', kanji: '', zh: '哪位 (誰的禮貌形)' },
  { id: 19, lesson: 1, jp: 'さい', kanji: '歳', zh: '歲' },
  { id: 20, lesson: 1, jp: 'なんさい', kanji: '何歳', zh: '幾歲' },
  { id: 21, lesson: 1, jp: 'はじめまして', kanji: '初めまして', zh: '初次見面' },

  // 第 2 課
  { id: 22, lesson: 2, jp: 'これ', kanji: '', zh: '這個 (離說話者近)' },
  { id: 23, lesson: 2, jp: 'それ', kanji: '', zh: '那個 (離聽話者近)' },
  { id: 24, lesson: 2, jp: 'あれ', kanji: '', zh: '那個 (離兩者都遠)' },
  { id: 25, lesson: 2, jp: 'この', kanji: '', zh: '這個～ (接名詞，離說話者近)' },
  { id: 26, lesson: 2, jp: 'その', kanji: '', zh: '那個～ (接名詞，離聽話者近)' },
  { id: 27, lesson: 2, jp: 'あの', kanji: '', zh: '那個～ (接名詞，離兩者都遠)' },
  { id: 28, lesson: 2, jp: 'ほん', kanji: '本', zh: '書' },
  { id: 29, lesson: 2, jp: 'じしょ', kanji: '辞書', zh: '字典' },
  { id: 30, lesson: 2, jp: 'ざっし', kanji: '雑誌', zh: '雜誌' },
  { id: 31, lesson: 2, jp: 'しんぶん', kanji: '新聞', zh: '報紙' },
  { id: 32, lesson: 2, jp: 'ノート', kanji: '', zh: '筆記本' },
  { id: 33, lesson: 2, jp: 'てちょう', kanji: '手帳', zh: '記事本' },
  { id: 34, lesson: 2, jp: 'めいし', kanji: '名刺', zh: '名片' },
  { id: 35, lesson: 2, jp: 'カード', kanji: '', zh: '卡片' },
  { id: 36, lesson: 2, jp: 'えんぴつ', kanji: '鉛筆', zh: '鉛筆' },
  { id: 37, lesson: 2, jp: 'ボールペン', kanji: '', zh: '原子筆' },
  { id: 38, lesson: 2, jp: 'かぎ', kanji: '', zh: '鑰匙' },
  { id: 39, lesson: 2, jp: 'とけい', kanji: '時計', zh: '鐘錶' },
  { id: 40, lesson: 2, jp: 'かさ', kanji: '傘', zh: '傘' },
  { id: 41, lesson: 2, jp: 'かばん', kanji: '', zh: '包包' },
  { id: 42, lesson: 2, jp: 'テレビ', kanji: '', zh: '電視' },
  { id: 43, lesson: 2, jp: 'ラジオ', kanji: '', zh: '收音機' },
  { id: 44, lesson: 2, jp: 'カメラ', kanji: '', zh: '相機' },
  { id: 45, lesson: 2, jp: 'くるま', kanji: '車', zh: '汽車' },
  { id: 46, lesson: 2, jp: 'つくえ', kanji: '机', zh: '桌子' },
  { id: 47, lesson: 2, jp: 'いす', kanji: '', zh: '椅子' },
  { id: 48, lesson: 2, jp: 'えいご', kanji: '英語', zh: '英語' },
  { id: 49, lesson: 2, jp: 'にほんご', kanji: '日本語', zh: '日語' },
  { id: 50, lesson: 2, jp: 'なん', kanji: '何', zh: '什麼' },

  // 第 3 課
  { id: 51, lesson: 3, jp: 'ここ', kanji: '', zh: '這裡、這兒' },
  { id: 52, lesson: 3, jp: 'そこ', kanji: '', zh: '那裡、那兒' },
  { id: 53, lesson: 3, jp: 'あそこ', kanji: '', zh: '那裡、那兒 (遠處)' },
  { id: 54, lesson: 3, jp: 'どこ', kanji: '', zh: '哪裡' },
  { id: 55, lesson: 3, jp: 'こちら', kanji: '', zh: '這邊 (這裡的禮貌形)' },
  { id: 56, lesson: 3, jp: 'そちら', kanji: '', zh: '那邊 (那裡的禮貌形)' },
  { id: 57, lesson: 3, jp: 'あちら', kanji: '', zh: '那邊 (遠處的禮貌形)' },
  { id: 58, lesson: 3, jp: 'どちら', kanji: '', zh: '哪邊 (哪裡的禮貌形)' },
  { id: 59, lesson: 3, jp: 'きょうしつ', kanji: '教室', zh: '教室' },
  { id: 60, lesson: 3, jp: 'しょくどう', kanji: '食堂', zh: '餐廳、食堂' },
  { id: 61, lesson: 3, jp: 'じむしょ', kanji: '事務所', zh: '辦公室' },
  { id: 62, lesson: 3, jp: 'かいぎしつ', kanji: '会議室', zh: '會議室' },
  { id: 63, lesson: 3, jp: 'うけつけ', kanji: '受付', zh: '櫃台、接待處' },
  { id: 64, lesson: 3, jp: 'ロビー', kanji: '', zh: '大廳' },
  { id: 65, lesson: 3, jp: 'へや', kanji: '部屋', zh: '房間' },
  { id: 66, lesson: 3, jp: 'トイレ', kanji: '', zh: '廁所' },
  { id: 67, lesson: 3, jp: 'かいだん', kanji: '階段', zh: '樓梯' },
  { id: 68, lesson: 3, jp: 'くに', kanji: '国', zh: '國家' },
  { id: 69, lesson: 3, jp: 'かいしゃ', kanji: '会社', zh: '公司' },
  { id: 70, lesson: 3, jp: 'うち', kanji: '', zh: '家' },
  { id: 71, lesson: 3, jp: 'でんわ', kanji: '電話', zh: '電話' },
  { id: 72, lesson: 3, jp: 'くつ', kanji: '靴', zh: '鞋子' },
  { id: 73, lesson: 3, jp: 'ネクタイ', kanji: '', zh: '領帶' },
  { id: 74, lesson: 3, jp: 'ワイン', kanji: '', zh: '葡萄酒' },
  { id: 75, lesson: 3, jp: 'いくら', kanji: '', zh: '多少錢' },
  { id: 76, lesson: 3, jp: 'ひゃく', kanji: '百', zh: '百' },
  { id: 77, lesson: 3, jp: 'せん', kanji: '千', zh: '千' },
  { id: 78, lesson: 3, jp: 'まん', kanji: '万', zh: '萬' },

  // 第 4 課
  { id: 79, lesson: 4, jp: 'おきます', kanji: '起きます', zh: '起床' },
  { id: 80, lesson: 4, jp: 'ねます', kanji: '寝ます', zh: '睡覺' },
  { id: 81, lesson: 4, jp: 'はたらきます', kanji: '働きます', zh: '工作' },
  { id: 82, lesson: 4, jp: 'やすみます', kanji: '休みます', zh: '休息' },
  { id: 83, lesson: 4, jp: 'べんきょうします', kanji: '勉強します', zh: '讀書、學習' },
  { id: 84, lesson: 4, jp: 'おわります', kanji: '終わります', zh: '結束' },
  { id: 85, lesson: 4, jp: 'デパート', kanji: '', zh: '百貨公司' },
  { id: 86, lesson: 4, jp: 'ぎんこう', kanji: '銀行', zh: '銀行' },
  { id: 87, lesson: 4, jp: 'ゆうびんきょく', kanji: '郵便局', zh: '郵局' },
  { id: 88, lesson: 4, jp: 'としょかん', kanji: '図書館', zh: '圖書館' },
  { id: 89, lesson: 4, jp: 'いま', kanji: '今', zh: '現在' },
  { id: 90, lesson: 4, jp: 'あさ', kanji: '朝', zh: '早上' },
  { id: 91, lesson: 4, jp: 'ひる', kanji: '昼', zh: '白天、中午' },
  { id: 92, lesson: 4, jp: 'ばん', kanji: '晩', zh: '晚上' },
  { id: 93, lesson: 4, jp: 'きのう', kanji: '', zh: '昨天' },
  { id: 94, lesson: 4, jp: 'きょう', kanji: '', zh: '今天' },
  { id: 95, lesson: 4, jp: 'あした', kanji: '', zh: '明天' },
  { id: 96, lesson: 4, jp: 'まいにち', kanji: '毎日', zh: '每天' },
  { id: 97, lesson: 4, jp: 'げつようび', kanji: '月曜日', zh: '星期一' },
  { id: 98, lesson: 4, jp: 'にちようび', kanji: '日曜日', zh: '星期日' },

  // 第 5 課
  { id: 99, lesson: 5, jp: 'いきます', kanji: '行きます', zh: '去' },
  { id: 100, lesson: 5, jp: 'きます', kanji: '来ます', zh: '來' },
  { id: 101, lesson: 5, jp: 'かえります', kanji: '帰ります', zh: '回家、回去' },
  { id: 102, lesson: 5, jp: 'がっこう', kanji: '学校', zh: '學校' },
  { id: 103, lesson: 5, jp: 'スーパー', kanji: '', zh: '超市' },
  { id: 104, lesson: 5, jp: 'えき', kanji: '駅', zh: '車站' },
  { id: 105, lesson: 5, jp: 'ひこうき', kanji: '飛行機', zh: '飛機' },
  { id: 106, lesson: 5, jp: 'ふね', kanji: '船', zh: '船' },
  { id: 107, lesson: 5, jp: 'でんしゃ', kanji: '電車', zh: '電車' },
  { id: 108, lesson: 5, jp: 'ちかてつ', kanji: '地下鉄', zh: '地下鐵' },
  { id: 109, lesson: 5, jp: 'しんかんせん', kanji: '新幹線', zh: '新幹線' },
  { id: 110, lesson: 5, jp: 'バス', kanji: '', zh: '公車' },
  { id: 111, lesson: 5, jp: 'タクシー', kanji: '', zh: '計程車' },
  { id: 112, lesson: 5, jp: 'じてんしゃ', kanji: '自転車', zh: '腳踏車' },
  { id: 113, lesson: 5, jp: 'ともだち', kanji: '友達', zh: '朋友' },
  { id: 114, lesson: 5, jp: 'かぞく', kanji: '家族', zh: '家人' },
  { id: 115, lesson: 5, jp: 'せんしゅう', kanji: '先週', zh: '上週' },
  { id: 116, lesson: 5, jp: 'こんしゅう', kanji: '今週', zh: '本週' },
  { id: 117, lesson: 5, jp: 'らいしゅう', kanji: '来週', zh: '下週' },
  { id: 118, lesson: 5, jp: 'いつ', kanji: '', zh: '什麼時候' },

  // 第 6 課
  { id: 119, lesson: 6, jp: 'たべます', kanji: '食べます', zh: '吃' },
  { id: 120, lesson: 6, jp: 'のみます', kanji: '飲みます', zh: '喝' },
  { id: 121, lesson: 6, jp: 'みます', kanji: '見ます', zh: '看' },
  { id: 122, lesson: 6, jp: 'ききます', kanji: '聞きます', zh: '聽' },
  { id: 123, lesson: 6, jp: 'よみます', kanji: '読みます', zh: '讀' },
  { id: 124, lesson: 6, jp: 'かきます', kanji: '書きます', zh: '寫' },
  { id: 125, lesson: 6, jp: 'かいます', kanji: '買います', zh: '買' },
  { id: 126, lesson: 6, jp: 'とります', kanji: '撮ります', zh: '拍(照)' },
  { id: 127, lesson: 6, jp: 'します', kanji: '', zh: '做' },
  { id: 128, lesson: 6, jp: 'あいます', kanji: '会います', zh: '遇見、碰見' },
  { id: 129, lesson: 6, jp: 'ごはん', kanji: '', zh: '飯' },
  { id: 130, lesson: 6, jp: 'パン', kanji: '', zh: '麵包' },
  { id: 131, lesson: 6, jp: 'にく', kanji: '肉', zh: '肉' },
  { id: 132, lesson: 6, jp: 'さかな', kanji: '魚', zh: '魚' },
  { id: 133, lesson: 6, jp: 'やさい', kanji: '野菜', zh: '蔬菜' },
  { id: 134, lesson: 6, jp: 'みず', kanji: '水', zh: '水' },
  { id: 135, lesson: 6, jp: 'おちゃ', kanji: 'お茶', zh: '茶' },
  { id: 136, lesson: 6, jp: 'えいが', kanji: '映画', zh: '電影' },
  { id: 137, lesson: 6, jp: 'てがみ', kanji: '手紙', zh: '信' },
  { id: 138, lesson: 6, jp: 'しゅくだい', kanji: '宿題', zh: '作業' },
  { id: 139, lesson: 6, jp: 'いっしょに', kanji: '一緒に', zh: '一起' },
  { id: 140, lesson: 6, jp: 'ときどき', kanji: '時々', zh: '有時候' },

  // 第 7 課
  { id: 141, lesson: 7, jp: 'きります', kanji: '切ります', zh: '切、剪' },
  { id: 142, lesson: 7, jp: 'おくります', kanji: '送ります', zh: '寄、送' },
  { id: 143, lesson: 7, jp: 'あげます', kanji: '', zh: '給' },
  { id: 144, lesson: 7, jp: 'もらいます', kanji: '', zh: '收到、得到' },
  { id: 145, lesson: 7, jp: 'かします', kanji: '貸します', zh: '借出' },
  { id: 146, lesson: 7, jp: 'かります', kanji: '借ります', zh: '借入' },
  { id: 147, lesson: 7, jp: 'おしえます', kanji: '教えます', zh: '教導' },
  { id: 148, lesson: 7, jp: 'ならいます', kanji: '習います', zh: '學習' },
  { id: 149, lesson: 7, jp: 'はし', kanji: '', zh: '筷子' },
  { id: 150, lesson: 7, jp: 'スプーン', kanji: '', zh: '湯匙' },
  { id: 151, lesson: 7, jp: 'はさみ', kanji: '', zh: '剪刀' },
  { id: 152, lesson: 7, jp: 'パソコン', kanji: '', zh: '個人電腦' },
  { id: 153, lesson: 7, jp: 'ケータイ', kanji: '', zh: '手機' },
  { id: 154, lesson: 7, jp: 'けしゴム', kanji: '消しゴム', zh: '橡皮擦' },
  { id: 155, lesson: 7, jp: 'プレゼント', kanji: '', zh: '禮物' },
  { id: 156, lesson: 7, jp: 'おかね', kanji: 'お金', zh: '錢' },
  { id: 157, lesson: 7, jp: 'もう', kanji: '', zh: '已經' },
  { id: 158, lesson: 7, jp: 'まだ', kanji: '', zh: '還沒' },
  { id: 159, lesson: 7, jp: 'これから', kanji: '', zh: '從現在起' },

  // 第 8 課
  { id: 160, lesson: 8, jp: 'ハンサム', kanji: '', zh: '英俊的' },
  { id: 161, lesson: 8, jp: 'きれい', kanji: '', zh: '美麗的、乾淨的' },
  { id: 162, lesson: 8, jp: 'しずか', kanji: '静か', zh: '安靜的' },
  { id: 163, lesson: 8, jp: 'にぎやか', kanji: '', zh: '熱鬧的' },
  { id: 164, lesson: 8, jp: 'ゆうめい', kanji: '有名', zh: '有名的' },
  { id: 165, lesson: 8, jp: 'しんせつ', kanji: '親切', zh: '親切的' },
  { id: 166, lesson: 8, jp: 'げんき', kanji: '元気', zh: '健康的、有精神的' },
  { id: 167, lesson: 8, jp: 'ひま', kanji: '暇', zh: '有空的' },
  { id: 168, lesson: 8, jp: 'べんり', kanji: '便利', zh: '方便的' },
  { id: 169, lesson: 8, jp: 'おおきい', kanji: '大きい', zh: '大的' },
  { id: 170, lesson: 8, jp: 'ちいさい', kanji: '小さい', zh: '小的' },
  { id: 171, lesson: 8, jp: 'あたらしい', kanji: '新しい', zh: '新的' },
  { id: 172, lesson: 8, jp: 'ふるい', kanji: '古い', zh: '舊的' },
  { id: 173, lesson: 8, jp: 'いい', kanji: '良い', zh: '好的' },
  { id: 174, lesson: 8, jp: 'わるい', kanji: '悪い', zh: '壞的' },
  { id: 175, lesson: 8, jp: 'あつい', kanji: '暑い', zh: '熱的(天氣)' },
  { id: 176, lesson: 8, jp: 'さむい', kanji: '寒い', zh: '寒冷的' },
  { id: 177, lesson: 8, jp: 'むずかしい', kanji: '難しい', zh: '困難的' },
  { id: 178, lesson: 8, jp: 'たかい', kanji: '高い', zh: '貴的、高的' },
  { id: 179, lesson: 8, jp: 'やすい', kanji: '安い', zh: '便宜的' },
  { id: 180, lesson: 8, jp: 'おいしい', kanji: '', zh: '好吃的' },
  { id: 181, lesson: 8, jp: 'いそがしい', kanji: '忙しい', zh: '忙碌的' },
  { id: 182, lesson: 8, jp: 'たのしい', kanji: '楽しい', zh: '開心的' },
  { id: 183, lesson: 8, jp: 'どう', kanji: '', zh: '怎麼樣' },
  { id: 184, lesson: 8, jp: 'どんな', kanji: '', zh: '什麼樣的' },
  { id: 185, lesson: 8, jp: 'とても', kanji: '', zh: '非常' },
  { id: 186, lesson: 8, jp: 'あまり', kanji: '', zh: '不太 (用於否定句)' },

  // 第 9 課
  { id: 187, lesson: 9, jp: 'わかります', kanji: '', zh: '了解、懂' },
  { id: 188, lesson: 9, jp: 'あります', kanji: '', zh: '有 (事物)' },
  { id: 189, lesson: 9, jp: 'すき', kanji: '好き', zh: '喜歡的' },
  { id: 190, lesson: 9, jp: 'きらい', kanji: '嫌い', zh: '討厭的' },
  { id: 191, lesson: 9, jp: 'じょうず', kanji: '上手', zh: '擅長的' },
  { id: 192, lesson: 9, jp: 'へた', kanji: '下手', zh: '不擅長的' },
  { id: 193, lesson: 9, jp: 'りょうり', kanji: '料理', zh: '料理' },
  { id: 194, lesson: 9, jp: 'スポーツ', kanji: '', zh: '運動' },
  { id: 195, lesson: 9, jp: 'おんがく', kanji: '音楽', zh: '音樂' },
  { id: 196, lesson: 9, jp: 'うた', kanji: '歌', zh: '歌曲' },
  { id: 197, lesson: 9, jp: 'え', kanji: '絵', zh: '圖畫' },
  { id: 198, lesson: 9, jp: 'かんじ', kanji: '漢字', zh: '漢字' },
  { id: 199, lesson: 9, jp: 'じかん', kanji: '時間', zh: '時間' },
  { id: 200, lesson: 9, jp: 'ようじ', kanji: '用事', zh: '事情' },
  { id: 201, lesson: 9, jp: 'やくそく', kanji: '約束', zh: '約定' },
  { id: 202, lesson: 9, jp: 'よく', kanji: '', zh: '很、非常' },
  { id: 203, lesson: 9, jp: 'だいたい', kanji: '', zh: '大概' },
  { id: 204, lesson: 9, jp: 'たくさん', kanji: '', zh: '很多' },
  { id: 205, lesson: 9, jp: 'すこし', kanji: '少し', zh: '少許、一點' },
  { id: 206, lesson: 9, jp: 'ぜんぜん', kanji: '全然', zh: '完全不 (用於否定句)' },
  { id: 207, lesson: 9, jp: 'どうして', kanji: '', zh: '為什麼' },
  { id: 208, lesson: 9, jp: 'から', kanji: '', zh: '因為～' },

  // 第 10 課
  { id: 209, lesson: 10, jp: 'います', kanji: '', zh: '有、在 (人、動物)' },
  { id: 210, lesson: 10, jp: 'あります', kanji: '', zh: '有、在 (物品、植物)' },
  { id: 211, lesson: 10, jp: 'いろいろ', kanji: '色々', zh: '各式各樣' },
  { id: 212, lesson: 10, jp: 'おとこのひと', kanji: '男の人', zh: '男人' },
  { id: 213, lesson: 10, jp: 'おんなのひと', kanji: '女の人', zh: '女人' },
  { id: 214, lesson: 10, jp: 'おとこのこ', kanji: '男の子', zh: '男孩' },
  { id: 215, lesson: 10, jp: 'おんなのこ', kanji: '女の子', zh: '女孩' },
  { id: 216, lesson: 10, jp: 'いぬ', kanji: '犬', zh: '狗' },
  { id: 217, lesson: 10, jp: 'ねこ', kanji: '猫', zh: '貓' },
  { id: 218, lesson: 10, jp: 'き', kanji: '木', zh: '樹木' },
  { id: 219, lesson: 10, jp: 'うえ', kanji: '上', zh: '上面' },
  { id: 220, lesson: 10, jp: 'した', kanji: '下', zh: '下面' },
  { id: 221, lesson: 10, jp: 'まえ', kanji: '前', zh: '前面' },
  { id: 222, lesson: 10, jp: 'うしろ', kanji: '後ろ', zh: '後面' },
  { id: 223, lesson: 10, jp: 'みぎ', kanji: '右', zh: '右邊' },
  { id: 224, lesson: 10, jp: 'ひだり', kanji: '左', zh: '左邊' },
  { id: 225, lesson: 10, jp: 'なか', kanji: '中', zh: '裡面' },
  { id: 226, lesson: 10, jp: 'そと', kanji: '外', zh: '外面' },
  { id: 227, lesson: 10, jp: 'となり', kanji: '隣', zh: '旁邊' },
  { id: 228, lesson: 10, jp: 'ちかく', kanji: '近く', zh: '附近' },
  { id: 229, lesson: 10, jp: 'あいだ', kanji: '間', zh: '中間' },

  // 第 11 課
  { id: 230, lesson: 11, jp: 'かかります', kanji: '', zh: '花費 (時間、金錢)' },
  { id: 231, lesson: 11, jp: 'ひとつ', kanji: '一つ', zh: '一個 (算數)' },
  { id: 232, lesson: 11, jp: 'ふたつ', kanji: '二つ', zh: '兩個' },
  { id: 233, lesson: 11, jp: 'みっつ', kanji: '三つ', zh: '三個' },
  { id: 234, lesson: 11, jp: 'よっつ', kanji: '四つ', zh: '四個' },
  { id: 235, lesson: 11, jp: 'いつつ', kanji: '五つ', zh: '五個' },
  { id: 236, lesson: 11, jp: 'むっつ', kanji: '六つ', zh: '六個' },
  { id: 237, lesson: 11, jp: 'ななつ', kanji: '七つ', zh: '七個' },
  { id: 238, lesson: 11, jp: 'やっつ', kanji: '八つ', zh: '八個' },
  { id: 239, lesson: 11, jp: 'ここのつ', kanji: '九つ', zh: '九個' },
  { id: 240, lesson: 11, jp: 'とお', kanji: '十', zh: '十個' },
  { id: 241, lesson: 11, jp: 'いくつ', kanji: '', zh: '幾個' },
  { id: 242, lesson: 11, jp: 'ひとり', kanji: '一人', zh: '一個人' },
  { id: 243, lesson: 11, jp: 'ふたり', kanji: '二人', zh: '兩個人' },
  { id: 244, lesson: 11, jp: 'りんご', kanji: '', zh: '蘋果' },
  { id: 245, lesson: 11, jp: 'みかん', kanji: '', zh: '橘子' },
  { id: 246, lesson: 11, jp: 'きって', kanji: '切手', zh: '郵票' },
  { id: 247, lesson: 11, jp: 'はがき', kanji: '葉書', zh: '明信片' },
  { id: 248, lesson: 11, jp: 'ふうとう', kanji: '封筒', zh: '信封' },
  { id: 249, lesson: 11, jp: 'りょうしん', kanji: '両親', zh: '雙親、父母' },
  { id: 250, lesson: 11, jp: 'きょうだい', kanji: '兄弟', zh: '兄弟姊妹' },

  // 第 12 課
  { id: 251, lesson: 12, jp: 'かんたん', kanji: '簡単', zh: '簡單的' },
  { id: 252, lesson: 12, jp: 'ちかい', kanji: '近い', zh: '近的' },
  { id: 253, lesson: 12, jp: 'とおい', kanji: '遠い', zh: '遠的' },
  { id: 254, lesson: 12, jp: 'はやい', kanji: '早い', zh: '早的、快的' },
  { id: 255, lesson: 12, jp: 'おそい', kanji: '遅い', zh: '晚的、慢的' },
  { id: 256, lesson: 12, jp: 'おおい', kanji: '多い', zh: '多的' },
  { id: 257, lesson: 12, jp: 'すくない', kanji: '少ない', zh: '少的' },
  { id: 258, lesson: 12, jp: 'あたたかい', kanji: '温かい', zh: '溫暖的' },
  { id: 259, lesson: 12, jp: 'すずしい', kanji: '涼しい', zh: '涼爽的' },
  { id: 260, lesson: 12, jp: 'あまい', kanji: '甘い', zh: '甜的' },
  { id: 261, lesson: 12, jp: 'からい', kanji: '辛い', zh: '辣的' },
  { id: 262, lesson: 12, jp: 'おもい', kanji: '重い', zh: '重的' },
  { id: 263, lesson: 12, jp: 'かるい', kanji: '軽い', zh: '輕的' },
  { id: 264, lesson: 12, jp: 'きせつ', kanji: '季節', zh: '季節' },
  { id: 265, lesson: 12, jp: 'はる', kanji: '春', zh: '春天' },
  { id: 266, lesson: 12, jp: 'なつ', kanji: '夏', zh: '夏天' },
  { id: 267, lesson: 12, jp: 'あき', kanji: '秋', zh: '秋天' },
  { id: 268, lesson: 12, jp: 'ふゆ', kanji: '冬', zh: '冬天' },
  { id: 269, lesson: 12, jp: 'てんき', kanji: '天気', zh: '天氣' },
  { id: 270, lesson: 12, jp: 'あめ', kanji: '雨', zh: '雨、下雨' },
];

// ==========================================
// 文法題庫資料 (第 1~12 課)
// ==========================================
const GRAMMAR_DATA = [
  // 第 1 課
  { id: 'g1', lesson: 1, question: 'わたし ___ マイク・ミラーです。', options: ['は', 'が', 'の', 'も'], answer: 'は', explanation: '「は」提示句子的主題，表示「我是...」。' },
  { id: 'g2', lesson: 1, question: 'サントスさん ___ 学生じゃありません。', options: ['は', 'が', 'に', 'を'], answer: 'は', explanation: '否定句「じゃありません」前的主題同樣使用助詞「は」。' },
  { id: 'g3', lesson: 1, question: 'ミラーさんは会社員です。グプタさん ___ 会社員です。', options: ['も', 'は', 'が', 'の'], answer: 'も', explanation: '「も」表示「也」，用來表示與前面敘述相同的情況（古普塔先生"也"是公司職員）。' },
  { id: 'g4', lesson: 1, question: 'あのかたは どなた ___。', options: ['ですか', 'は', 'です', 'も'], answer: 'ですか', explanation: '名詞疑問句的結尾使用「ですか」。' },
  { id: 'g5', lesson: 1, question: 'IMC ___ 社員です。', options: ['の', 'は', 'も', 'が'], answer: 'の', explanation: '「の」用來連接兩個名詞，表示所屬關係（IMC"的"職員）。' },
  { id: 'g6', lesson: 1, question: 'ワンさんは 医者ですか。 \n...いいえ、医者 ___。', options: ['じゃありません', 'です', 'ではありませんか', 'でした'], answer: 'じゃありません', explanation: '針對「～ですか」的否定回答，名詞結尾接「じゃありません」（不是）。' },
  
  // 第 2 課
  { id: 'g7', lesson: 2, question: '___ は辞書です。', options: ['これ', 'この', 'ここ', 'こちら'], answer: 'これ', explanation: '「これ」是代名詞「這個」，後面直接接助詞「は」。(「この」後面必須接名詞)' },
  { id: 'g8', lesson: 2, question: '___ 傘はわたしのです。', options: ['この', 'これ', 'ここ', 'こちら'], answer: 'この', explanation: '「この」是連體詞，後面必須接名詞（この傘 = 這把傘）。' },
  { id: 'g9', lesson: 2, question: 'それは ___ のカメラですか。', options: ['だれ', 'なん', 'どこ', 'いつ'], answer: 'だれ', explanation: '詢問「誰的」時，使用「だれ」加上助詞「の」，變成「だれの」。' },
  { id: 'g10', lesson: 2, question: 'これは コンピューターの 本 ___。', options: ['です', 'か', 'も', 'じゃありません'], answer: 'です', explanation: '肯定句的結尾使用「です」。' },
  { id: 'g11', lesson: 2, question: 'それは シャープペンシルですか。 \n...はい、___。', options: ['そうです', 'そうじゃありません', 'ちがいます', 'これです'], answer: 'そうです', explanation: '針對名詞疑問句的肯定回答，通常用「はい、そうです」。' },
  { id: 'g12', lesson: 2, question: 'このかばんは わたし ___ です。', options: ['の', 'は', 'も', 'が'], answer: 'の', explanation: '「わたしの」省略了後面的名詞(かばん)，表示「我的(包包)」。' },

  // 第 3 課
  { id: 'g13', lesson: 3, question: 'トイレは ___ ですか。', options: ['どこ', 'だれ', 'なん', 'どれ'], answer: 'どこ', explanation: '詢問地點「在哪裡」時，使用疑問詞「どこ」。' },
  { id: 'g14', lesson: 3, question: 'エレベーターは ___ です。', options: ['あそこ', 'あれ', 'あの', 'あちら'], answer: 'あそこ', explanation: '「あそこ」是代名詞「那裡(遠處)」，可用來指示地點。' },
  { id: 'g15', lesson: 3, question: 'お国は ___ ですか。', options: ['どちら', 'どこ', 'だれ', 'なん'], answer: 'どちら', explanation: '詢問國家、公司、學校等所屬地點時，出於禮貌通常使用「どちら」。' },
  { id: 'g16', lesson: 3, question: 'これは ___ の ワインですか。 \n...フランスの ワインです。', options: ['どこ', 'なん', 'だれ', 'いくら'], answer: 'どこ', explanation: '詢問產地或製造商時，使用「どこ」+「の」+ 名詞。' },
  { id: 'g17', lesson: 3, question: 'この時計は ___ ですか。 \n...18,600円です。', options: ['いくら', 'いくつ', 'どこ', 'なん'], answer: 'いくら', explanation: '詢問價格「多少錢」時，使用疑問詞「いくら」。' },

  // 第 4 課
  { id: 'g18', lesson: 4, question: '今、何時 ___ か。', options: ['です', 'ます', 'は', 'が'], answer: 'です', explanation: '詢問現在時間時，用名詞句的「ですか」來結尾。' },
  { id: 'g19', lesson: 4, question: '銀行は 9時 ___ 3時まで です。', options: ['から', 'まで', 'に', 'と'], answer: 'から', explanation: '「から」表示時間或空間的起點 (從...)；「まで」表示終點 (到...)。' },
  { id: 'g20', lesson: 4, question: 'きのう 勉強 ___。', options: ['しました', 'します', 'しません', 'です'], answer: 'しました', explanation: '句子中有「きのう(昨天)」，所以動詞必須使用過去式「～ました」。' },
  { id: 'g21', lesson: 4, question: '休みは 土曜日 ___ 日曜日です。', options: ['と', 'に', 'へ', 'を'], answer: 'と', explanation: '「と」用來連接兩個名詞，表示「和、與」(星期六與星期日)。' },
  { id: 'g22', lesson: 4, question: '毎晩 何時 ___ 寝ますか。', options: ['に', 'は', 'が', 'を'], answer: 'に', explanation: '在具體的時間點(幾點、幾號)發生動作時，時間後面必須加上助詞「に」。' },

  // 第 5 課
  { id: 'g23', lesson: 5, question: 'わたしは スーパー ___ 行きます。', options: ['へ', 'で', 'に', 'を'], answer: 'へ', explanation: '表示移動的目標方向(去、來、回)時，目的地後面接助詞「へ」(發音為e)。' },
  { id: 'g24', lesson: 5, question: 'どこ ___ 行きません。', options: ['も', 'へ', 'か', 'に'], answer: 'も', explanation: '疑問詞(どこ/なに/だれ)加上「も」與否定動詞連用時，表示全面否定 (哪裡都不去)。' },
  { id: 'g25', lesson: 5, question: 'バス ___ 会社へ 行きます。', options: ['で', 'に', 'へ', 'を'], answer: 'で', explanation: '使用交通工具或手段時，名詞後接助詞「で」(搭乘公車)。' },
  { id: 'g26', lesson: 5, question: '友達 ___ 日本へ 来ました。', options: ['と', 'に', 'で', 'へ'], answer: 'と', explanation: '表示共同進行動作的伴隨者時，對象後面接助詞「と」(和朋友一起)。' },
  { id: 'g27', lesson: 5, question: '___ 日本へ 来ましたか。 \n...8月に 来ました。', options: ['いつ', 'どこ', 'なん', 'だれ'], answer: 'いつ', explanation: '詢問「什麼時候」發生的事時，使用疑問詞「いつ」。(いつ後面不需要加助詞に)' },

  // 第 6 課
  { id: 'g28', lesson: 6, question: 'パン ___ 食べます。', options: ['を', 'が', 'は', 'で'], answer: 'を', explanation: '表示他動詞(吃、喝、看等)的直接動作對象時，受詞後方接助詞「を」。' },
  { id: 'g29', lesson: 6, question: 'デパート ___ 靴を 買いました。', options: ['で', 'に', 'へ', 'を'], answer: 'で', explanation: '動作發生的場所，必須使用助詞「で」(在百貨公司買鞋)。' },
  { id: 'g30', lesson: 6, question: '一緒に ビールを 飲み___。 \n...ええ、いいですね。', options: ['ませんか', 'ましょう', 'ます', 'ました'], answer: 'ませんか', explanation: '「～ませんか」是委婉地邀請對方的句型 (不一起喝杯啤酒嗎？)。' },
  { id: 'g31', lesson: 6, question: 'ちょっと 休み___。', options: ['ましょう', 'ませんか', 'ますか', 'ました'], answer: 'ましょう', explanation: '「～ましょう」用於積極地提議、勸誘對方一起做某事 (休息一下吧)。' },
  { id: 'g32', lesson: 6, question: 'きのう 何 ___ しませんでした。', options: ['も', 'を', 'が', 'か'], answer: 'も', explanation: '疑問詞(なに)加上「も」與否定式連用，表示全面否定 (什麼都沒做)。' },

  // 第 7 課
  { id: 'g33', lesson: 7, question: 'わたしは はし ___ ごはんを食べます。', options: ['で', 'に', 'を', 'と'], answer: 'で', explanation: '使用工具或手段進行動作時，名詞後方接助詞「で」(用筷子吃飯)。' },
  { id: 'g34', lesson: 7, question: '木村さんに 花を ___。', options: ['あげます', 'もらいます', 'かります', 'ならいます'], answer: 'あげます', explanation: '「あげます」是給予別人；「もらいます」是從別人那裡收到。「に」在這裡表示給予的對象。' },
  { id: 'g35', lesson: 7, question: 'カリナさん ___ チョコレートをもらいました。', options: ['に', 'を', 'で', 'は'], answer: 'に', explanation: '從別人那裡「收到(もらいます)」物品時，對方的後方使用助詞「に」或「から」。' },
  { id: 'g36', lesson: 7, question: '___ 昼ごはんを 食べましたか。', options: ['もう', 'まだ', 'これから', 'いつも'], answer: 'もう', explanation: '「もう～ましたか」用來詢問某個動作是否「已經」完成。' },
  { id: 'g37', lesson: 7, question: 'もう レポートを 書きましたか。 \n...いいえ、___ です。', options: ['まだ', 'もう', 'しません', 'ちがいます'], answer: 'まだ', explanation: '針對「もう～ましたか」的否定回答，習慣上使用「いいえ、まだです」(還沒)。' },

  // 第 8 課
  { id: 'g38', lesson: 8, question: '大阪は ___ 町です。', options: ['にぎやかな', 'にぎやか', 'にぎやかだ', 'にぎやかの'], answer: 'にぎやかな', explanation: '「な形容詞」修飾後面的名詞(町)時，必須加上「な」。' },
  { id: 'g39', lesson: 8, question: '日本のカメラは ___。', options: ['高いです', '高いなです', '高のカメラです', '高です'], answer: '高いです', explanation: '「い形容詞」作為述語時，直接在後面加上「です」即可。' },
  { id: 'g40', lesson: 8, question: 'このパソコンは 便利ですが、___。', options: ['高いです', '安いです', 'いいです', '便利です'], answer: '高いです', explanation: '助詞「が」用來連接兩個對立的句子，表示「雖然...但是...」(雖然方便，但很貴)。' },
  { id: 'g41', lesson: 8, question: '日本の生活は ___ ですか。 \n...楽しいです。', options: ['どう', 'どんな', 'どれ', 'どこ'], answer: 'どう', explanation: '詢問對某事物的印象或意見時，使用「どうですか」(怎麼樣？)。' },
  { id: 'g42', lesson: 8, question: '奈良は ___ 町ですか。 \n...古い 町です。', options: ['どんな', 'どう', 'なん', 'どこ'], answer: 'どんな', explanation: '詢問人或事物的性質/狀態時，因為後面有接名詞(町)，必須使用「どんな」(什麼樣的)。' },
  { id: 'g43', lesson: 8, question: 'きのうの試験は ___ 難しくなかったです。', options: ['あまり', 'とても', 'たくさん', '全然'], answer: 'あまり', explanation: '「あまり」必須搭配否定句，表示「不太...」(不太困難)。' },

  // 第 9 課
  { id: 'g44', lesson: 9, question: 'わたしは イタリア料理 ___ 好きです。', options: ['が', 'を', 'は', 'で'], answer: 'が', explanation: '表示喜歡(好き)、討厭(嫌い)的對象時，必須使用助詞「が」。' },
  { id: 'g45', lesson: 9, question: 'マリアさんは ダンス ___ 上手です。', options: ['が', 'を', 'に', 'は'], answer: 'が', explanation: '表示擅長(上手)、不擅長(下手)的對象時，必須使用助詞「が」。' },
  { id: 'g46', lesson: 9, question: 'わたしは 英語が ___ わかります。', options: ['よく', 'たくさん', 'とても', '全然'], answer: 'よく', explanation: '「よく」用來修飾動詞，表示程度高(很懂/非常了解)。「たくさん」通常用於數量多。' },
  { id: 'g47', lesson: 9, question: 'お金が ___ ありません。', options: ['全然', 'あまり', '少し', 'だいたい'], answer: '全然', explanation: '「全然」必須與否定句連用，表示「完全不/完全沒有」。' },
  { id: 'g48', lesson: 9, question: '___ 会社を休みますか。 \n...熱が ありますから。', options: ['どうして', 'どう', 'いつ', 'なん'], answer: 'どうして', explanation: '詢問原因理由時，使用疑問詞「どうして」(為什麼)。' },
  { id: 'g49', lesson: 9, question: '時間が ありません ___、新聞を 読みません。', options: ['から', 'が', 'と', 'で'], answer: 'から', explanation: '「から」接在句子後方，表示原因、理由(因為沒有時間)。' },

  // 第 10 課
  { id: 'g50', lesson: 10, question: 'あそこに 佐藤さんが ___。', options: ['います', 'あります', 'です', 'します'], answer: 'います', explanation: '「います」用於表示「人」或「動物」等有生命事物存在。' },
  { id: 'g51', lesson: 10, question: '机の上に 写真が ___。', options: ['あります', 'います', 'です', 'します'], answer: 'あります', explanation: '「あります」用於表示「物品」或「植物」等無生命事物存在。' },
  { id: 'g52', lesson: 10, question: '本屋は 銀行の 隣 ___ あります。', options: ['に', 'で', 'を', 'へ'], answer: 'に', explanation: '表示人或物品存在的「場所」時，地點後面必須接助詞「に」。' },
  { id: 'g53', lesson: 10, question: '銀行 ___ どこに ありますか。', options: ['は', 'が', 'に', 'を'], answer: 'は', explanation: '以某事物作為主題來詢問其所在位置時，主題後方接助詞「は」。' },
  { id: 'g54', lesson: 10, question: '箱の中に 手紙 ___ 写真などが あります。', options: ['や', 'と', 'に', 'で'], answer: 'や', explanation: '「や」用於列舉兩個以上的名詞，暗示除此之外還有其他東西 (和...等等)。' },

  // 第 11 課
  { id: 'g55', lesson: 11, question: 'りんごを 3 ___ 買いました。', options: ['つ', '個', 'まい', 'だい'], answer: 'つ', explanation: '計算無特定形狀的物品(如蘋果、橘子)時，使用「～つ」(ひとつ、ふたつ...)。' },
  { id: 'g56', lesson: 11, question: '80円の 切手を 5 ___ 買いました。', options: ['まい', 'だい', 'にん', 'つ'], answer: 'まい', explanation: '「まい (枚)」用來計算薄而平的物品，如郵票、襯衫、紙張等。' },
  { id: 'g57', lesson: 11, question: '教室に 学生が 5 ___ います。', options: ['にん', 'まい', 'だい', 'つ'], answer: 'にん', explanation: '「にん (人)」用來計算人數 (1人=ひとり，2人=ふたり，3人以上加にん)。' },
  { id: 'g58', lesson: 11, question: '1週間 ___ 2回 テニスを します。', options: ['に', 'で', 'と', 'を'], answer: 'に', explanation: '表示在一定的期間內做某事的頻率時，期間後面接助詞「に」(一週兩次)。' },
  { id: 'g59', lesson: 11, question: '大阪から 東京まで 新幹線で 2時間 ___。', options: ['かかります', 'あります', 'います', 'します'], answer: 'かかります', explanation: '表示花費的時間或金錢時，使用動詞「かかります」。' },

  // 第 12 課
  { id: 'g60', lesson: 12, question: 'きのうは 雨 ___。', options: ['でした', 'だ', 'じゃありませんでした', 'です'], answer: 'でした', explanation: '名詞的過去肯定式為「でした」(昨天是雨天)。' },
  { id: 'g61', lesson: 12, question: 'きのうの パーティーは ___。', options: ['楽しかったです', '楽しいでした', '楽しかったでした', '楽しいです'], answer: '楽しかったです', explanation: '「い形容詞」的過去肯定式是去掉「い」加上「かったです」。絕對不能說 楽しいでした！' },
  { id: 'g62', lesson: 12, question: 'きのうの 試験は あまり ___。', options: ['難しくなかったです', '難しいです', '難しかったです', '難しいでした'], answer: '難しくなかったです', explanation: '「あまり」必須搭配否定。「い形容詞」的過去否定式是去掉「い」加上「くなかったです」。' },
  { id: 'g63', lesson: 12, question: '東京は 大阪 ___ 大きいですか。', options: ['より', 'と', 'から', 'まで'], answer: 'より', explanation: '比較兩者時，比較基準(相較於大阪...)的後方接助詞「より」。' },
  { id: 'g64', lesson: 12, question: 'サッカー ___ 野球 ___、どちらが おもしろいですか。', options: ['と / と', 'は / は', 'が / が', 'と / は'], answer: 'と / と', explanation: '詢問A和B兩者哪一個比較...時，句型為「Aと Bと どちらが ～ですか」。' },
  { id: 'g65', lesson: 12, question: '1年で いつ ___ いちばん 寒いですか。', options: ['が', 'は', 'を', 'で'], answer: 'が', explanation: '疑問詞(いつ/どこ/だれ/なに)作主語時，後方必須接助詞「が」。' },
];

const LESSONS = [
  { id: 'all', name: '綜合測驗 (全部)' },
  { id: 1, name: '第 1 課' },
  { id: 2, name: '第 2 課' },
  { id: 3, name: '第 3 課' },
  { id: 4, name: '第 4 課' },
  { id: 5, name: '第 5 課' },
  { id: 6, name: '第 6 課' },
  { id: 7, name: '第 7 課' },
  { id: 8, name: '第 8 課' },
  { id: 9, name: '第 9 課' },
  { id: 10, name: '第 10 課' },
  { id: 11, name: '第 11 課' },
  { id: 12, name: '第 12 課' },
];

export default function App() {
  const [view, setView] = useState('home'); // 'home', 'quiz', 'result'
  const [config, setConfig] = useState({ type: 'vocab', lesson: 'all', questionCount: 10 });
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  // 隨機排列陣列的輔助函數
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // 生成測驗題目
  const startQuiz = () => {
    if (config.type === 'vocab') {
      // --- 單字測驗邏輯 ---
      let pool = VOCAB_DATA;
      if (config.lesson !== 'all') {
        pool = VOCAB_DATA.filter((v) => v.lesson === config.lesson);
      }

      // 隨機選出指定數量的單字作為題目
      const selectedWords = shuffleArray(pool).slice(0, Math.min(config.questionCount, pool.length));

      // 建立選項 (增強混淆性)
      const newQuestions = selectedWords.map((target) => {
        // 找出不包含正確答案的其他單字
        let allOtherWords = VOCAB_DATA.filter((v) => v.id !== target.id);
        let similarWords = [];

        // 混淆邏輯 1：如果是動詞 (ます結尾)，優先找其他動詞
        if (target.jp.endsWith('ます')) {
          similarWords = allOtherWords.filter(v => v.jp.endsWith('ます'));
        }
        // 混淆邏輯 2：如果是星期 (ようび結尾)，優先找其他星期
        else if (target.jp.endsWith('ようび')) {
          similarWords = allOtherWords.filter(v => v.jp.endsWith('ようび'));
        }
        // 混淆邏輯 3：指示代名詞 (こ・そ・あ・ど 系列)
        else if (['これ', 'それ', 'あれ', 'この', 'その', 'あの', 'ここ', 'そこ', 'あそこ', 'どこ', 'こちら', 'そちら', 'あちら', 'どちら'].includes(target.jp)) {
          similarWords = allOtherWords.filter(v => ['これ', 'それ', 'あれ', 'この', 'その', 'あの', 'ここ', 'そこ', 'あそこ', 'どこ', 'こちら', 'そちら', 'あちら', 'どちら'].includes(v.jp));
        }
        // 混淆邏輯 4：疑問詞
        else if (['だれ', 'どなた', 'なん', 'いつ', 'いくら', 'いくつ', 'どうして'].includes(target.jp)) {
          similarWords = allOtherWords.filter(v => ['だれ', 'どなた', 'なん', 'いつ', 'いくら', 'どこ', 'どちら', 'いくつ', 'どうして'].includes(v.jp));
        }
        // 混淆邏輯 5：時間詞彙
        else if (['いま', 'あさ', 'ひる', 'ばん', 'きのう', 'きょう', 'あした', 'まいにち', 'せんしゅう', 'こんしゅう', 'らいしゅう'].includes(target.jp)) {
          similarWords = allOtherWords.filter(v => ['いま', 'あさ', 'ひる', 'ばん', 'きのう', 'きょう', 'あした', 'まいにち', 'せんしゅう', 'こんしゅう', 'らいしゅう'].includes(v.jp));
        }
        // 混淆邏輯 6：數字相關
        else if (['ひゃく', 'せん', 'まん', 'さい', 'なんさい'].includes(target.jp)) {
          similarWords = allOtherWords.filter(v => ['ひゃく', 'せん', 'まん', 'さい', 'なんさい', 'いくら'].includes(v.jp));
        }
        // 混淆邏輯 7：量詞 (第11課)
        else if (['ひとつ', 'ふたつ', 'みっつ', 'よっつ', 'いつつ', 'むっつ', 'ななつ', 'やっつ', 'ここのつ', 'とお', 'ひとり', 'ふたり'].includes(target.jp)) {
          similarWords = allOtherWords.filter(v => ['ひとつ', 'ふたつ', 'みっつ', 'よっつ', 'いつつ', 'むっつ', 'ななつ', 'やっつ', 'ここのつ', 'とお', 'ひとり', 'ふたり'].includes(v.jp));
        }
        // 混淆邏輯 8：預設尋找「同一課」的單字 (因為同一課通常是同一主題，例如形容詞、文具、地點)
        else {
          similarWords = allOtherWords.filter((v) => v.lesson === target.lesson);
        }

        // 打亂相似單字並嘗試取 3 個錯誤選項
        let wrongWords = shuffleArray(similarWords).slice(0, 3);

        // 如果相似的單字不足 3 個，才從全部單字中隨機補齊
        if (wrongWords.length < 3) {
          const remainingWords = allOtherWords.filter(v => !wrongWords.find(w => w.id === v.id));
          const needed = 3 - wrongWords.length;
          wrongWords = [...wrongWords, ...shuffleArray(remainingWords).slice(0, needed)];
        }
        
        // 合併並打亂 1 個正確 + 3 個錯誤選項
        const options = shuffleArray([target, ...wrongWords]);

        return {
          type: 'vocab',
          target,
          options,
          isAnswered: false,
          selectedId: null,
        };
      });

      setQuestions(newQuestions);
    } else {
      // --- 文法測驗邏輯 ---
      let pool = GRAMMAR_DATA;
      if (config.lesson !== 'all') {
        pool = GRAMMAR_DATA.filter((g) => g.lesson === config.lesson);
      }

      const selectedQuestions = shuffleArray(pool).slice(0, Math.min(config.questionCount, pool.length));

      const newQuestions = selectedQuestions.map((q) => {
        // 將文法的字串選項轉換為帶有 id 的物件形式，方便後續比對與渲染
        const options = shuffleArray(q.options).map((opt, idx) => ({
          id: `opt_${idx}`,
          text: opt
        }));

        const correctAnswerId = options.find(o => o.text === q.answer).id;

        return {
          type: 'grammar',
          target: q,
          options: options,
          isAnswered: false,
          selectedId: null,
          answerId: correctAnswerId // 記錄正確選項的 id
        };
      });

      setQuestions(newQuestions);
    }

    setCurrentIndex(0);
    setScore(0);
    setView('quiz');
  };

  // 處理點擊選項
  const handleSelectOption = (optionId) => {
    const currentQ = questions[currentIndex];
    if (currentQ.isAnswered) return;

    // 判斷是否答對
    const isCorrect = currentQ.type === 'grammar' 
      ? optionId === currentQ.answerId 
      : optionId === currentQ.target.id;

    if (isCorrect) setScore((prev) => prev + 1);

    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = {
      ...updatedQuestions[currentIndex],
      isAnswered: true,
      selectedId: optionId,
    };
    setQuestions(updatedQuestions);
  };

  // 進入下一題或結算
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setView('result');
    }
  };

  // 單字測驗：取得按鈕或文字的顯示內容 (固定為 日翻中)
  const getDisplayText = (word, isMainQuestion) => {
    if (isMainQuestion) {
      // 題目顯示日文 + 漢字(上方注音)
      return word.kanji ? (
        <ruby className="flex flex-col items-center">
          <rt className="text-sm md:text-base text-indigo-500 font-medium mb-1">{word.jp}</rt>
          <span>{word.kanji}</span>
        </ruby>
      ) : (
        <span>{word.jp}</span>
      );
    } else {
      // 選項顯示中文
      return <span>{word.zh}</span>;
    }
  };

  // --- 畫面渲染 ---

  // 1. 首頁 (設定與開始)
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-8 text-center text-white">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h1 className="text-2xl font-bold tracking-wider mb-2">大家的日本語 初級 I</h1>
            <p className="text-indigo-200">單字與文法綜合測驗</p>
          </div>

          <div className="p-8 space-y-6">
            {/* 測驗類型 */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-600 mb-3">
                <PenTool className="w-4 h-4 mr-2" /> 測驗類型
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfig({ ...config, type: 'vocab' })}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    config.type === 'vocab'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  單字測驗
                </button>
                <button
                  onClick={() => setConfig({ ...config, type: 'grammar' })}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    config.type === 'grammar'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  文法測驗
                </button>
              </div>
            </div>

            {/* 課程選擇 */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-600 mb-3">
                <Settings className="w-4 h-4 mr-2" /> 選擇範圍
              </label>
              <div className="grid grid-cols-2 gap-3 h-48 overflow-y-auto pr-2 custom-scrollbar">
                {LESSONS.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setConfig({ ...config, lesson: lesson.id })}
                    className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
                      config.lesson === lesson.id
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {lesson.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 題數選擇 */}
            <div>
              <label className="text-sm font-semibold text-slate-600 mb-3 block">測驗題數</label>
              <select
                value={config.questionCount}
                onChange={(e) => setConfig({ ...config, questionCount: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={10}>10 題 (快速複習)</option>
                <option value={20}>20 題 (標準測驗)</option>
                <option value={30}>30 題 (加強練習)</option>
                <option value={50}>50 題 (深度挑戰)</option>
              </select>
            </div>

            <button
              onClick={startQuiz}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex justify-center items-center gap-2"
            >
              <Play className="w-5 h-5" /> 開始測驗
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 測驗中
  if (view === 'quiz' && questions.length > 0) {
    const currentQ = questions[currentIndex];
    const progressPercent = ((currentIndex) / questions.length) * 100;
    
    // 判斷當前正確的 ID
    const correctId = currentQ.type === 'grammar' ? currentQ.answerId : currentQ.target.id;
    // 判斷使用者是否答錯
    const isUserWrong = currentQ.isAnswered && currentQ.selectedId !== correctId;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8 font-sans text-slate-800">
        <div className="w-full max-w-xl">
          {/* 進度條與狀態 */}
          <div className="flex justify-between items-center mb-4 text-sm font-medium text-slate-500">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-indigo-600 font-bold">Score: {score}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 mb-8 overflow-hidden">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* 題目卡片 */}
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-6 text-center min-h-[220px] flex items-center justify-center relative">
            <div className={`font-bold text-slate-800 tracking-wide whitespace-pre-wrap ${currentQ.type === 'grammar' ? 'text-2xl md:text-3xl leading-relaxed' : 'text-4xl md:text-5xl'}`}>
              {currentQ.type === 'grammar' 
                ? currentQ.target.question 
                : getDisplayText(currentQ.target, true)}
            </div>
            
            {/* 左上角提示 */}
            <div className="absolute top-4 left-6 text-xs text-slate-400 font-medium">
              {currentQ.type === 'grammar' ? '請選擇最適合填入空格的答案' : '請問這個日文的中文意思是？'}
            </div>
          </div>

          {/* 選項區 */}
          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((option) => {
              const isSelected = currentQ.selectedId === option.id;
              const isCorrectOption = option.id === correctId;
              let buttonStyles = "bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";

              if (currentQ.isAnswered) {
                if (isCorrectOption) {
                  buttonStyles = "bg-green-50 border-green-500 text-green-700 shadow-md"; // 正確答案高亮綠色
                } else if (isSelected && !isCorrectOption) {
                  buttonStyles = "bg-red-50 border-red-400 text-red-600"; // 選錯的高亮紅色
                } else {
                  buttonStyles = "bg-white border-slate-200 opacity-50"; // 其他未選的變淡
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={currentQ.isAnswered}
                  className={`w-full text-left py-4 px-6 rounded-2xl border-2 text-lg font-medium transition-all flex items-center justify-between ${buttonStyles}`}
                >
                  <span>
                    {currentQ.type === 'grammar' ? option.text : getDisplayText(option, false)}
                  </span>
                  
                  {/* 顯示正確/錯誤圖示 */}
                  {currentQ.isAnswered && isCorrectOption && (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  )}
                  {currentQ.isAnswered && isSelected && !isCorrectOption && (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 答錯時顯示的解析區塊 */}
          {isUserWrong && (
            <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-2xl text-left animate-fade-in-up">
              <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                <Info className="w-5 h-5" /> 答案解析
              </h4>
              <p className="text-blue-700 leading-relaxed">
                {currentQ.type === 'grammar' 
                  ? currentQ.target.explanation 
                  : `「${currentQ.target.jp}${currentQ.target.kanji ? ` (${currentQ.target.kanji})` : ''}」的中文意思是「${currentQ.target.zh}」。`
                }
              </p>
            </div>
          )}

          {/* 下一題按鈕 */}
          {currentQ.isAnswered && (
            <button
              onClick={nextQuestion}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex justify-center items-center gap-2 animate-fade-in-up"
            >
              {currentIndex < questions.length - 1 ? '下一題' : '查看成績'} 
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. 測驗結果
  if (view === 'result') {
    const percentage = Math.round((score / questions.length) * 100);
    let message = '';
    let emoji = '';
    
    if (percentage === 100) { message = '太完美了！完全掌握！'; emoji = '🏆'; }
    else if (percentage >= 80) { message = '表現優異！繼續保持！'; emoji = '🌟'; }
    else if (percentage >= 60) { message = '做得不錯，再多複習幾次會更好！'; emoji = '👍'; }
    else { message = '革命尚未成功，同志仍須努力！'; emoji = '💪'; }

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-indigo-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">測驗完成 {emoji}</h2>
          <p className="text-slate-500 mb-8">{message}</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <div className="text-5xl font-extrabold text-indigo-600 mb-2">
              {score} <span className="text-2xl text-slate-400">/ {questions.length}</span>
            </div>
            <p className="text-sm font-medium text-slate-500">總得分 (答對率 {percentage}%)</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={startQuiz}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-indigo-200"
            >
              <RotateCcw className="w-5 h-5" /> 再測驗一次
            </button>
            <button
              onClick={() => setView('home')}
              className="w-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold py-4 rounded-xl transition-all flex justify-center items-center"
            >
              回首頁設定
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}