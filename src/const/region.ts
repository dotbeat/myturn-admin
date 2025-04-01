import { SelectGroup } from "@/types/select";

export const regions: SelectGroup[] = [
  {
    label: "北海道・東北",
    items: [
      { value: "北海道", label: "北海道" },
      { value: "青森県", label: "青森県" },
      { value: "岩手県", label: "岩手県" },
      { value: "宮城県", label: "宮城県" },
      { value: "秋田県", label: "秋田県" },
      { value: "山形県", label: "山形県" },
      { value: "福島県", label: "福島県" },
    ],
  },
  {
    label: "関東",
    items: [
      { value: "東京都", label: "東京都" },
      { value: "神奈川県", label: "神奈川県" },
      { value: "埼玉県", label: "埼玉県" },
      { value: "千葉県", label: "千葉県" },
      { value: "茨城県", label: "茨城県" },
      { value: "栃木県", label: "栃木県" },
      { value: "群馬県", label: "群馬県" },
    ],
  },
  {
    label: "中部・甲信越",
    items: [
      { value: "愛知県", label: "愛知県" },
      { value: "新潟県", label: "新潟県" },
      { value: "富山県", label: "富山県" },
      { value: "石川県", label: "石川県" },
      { value: "福井県", label: "福井県" },
      { value: "山梨県", label: "山梨県" },
      { value: "長野県", label: "長野県" },
      { value: "岐阜県", label: "岐阜県" },
      { value: "静岡県", label: "静岡県" },
      { value: "三重県", label: "三重県" },
    ],
  },
  {
    label: "関西",
    items: [
      { value: "大阪府", label: "大阪府" },
      { value: "兵庫県", label: "兵庫県" },
      { value: "滋賀県", label: "滋賀県" },
      { value: "京都府", label: "京都府" },
      { value: "奈良県", label: "奈良県" },
      { value: "和歌山県", label: "和歌山県" },
    ],
  },
  {
    label: "中国・四国",
    items: [
      { value: "鳥取県", label: "鳥取県" },
      { value: "島根県", label: "島根県" },
      { value: "岡山県", label: "岡山県" },
      { value: "広島県", label: "広島県" },
      { value: "山口県", label: "山口県" },
      { value: "徳島県", label: "徳島県" },
      { value: "香川県", label: "香川県" },
      { value: "愛媛県", label: "愛媛県" },
      { value: "高知県", label: "高知県" },
    ],
  },
  {
    label: "九州・沖縄",
    items: [
      { value: "福岡県", label: "福岡県" },
      { value: "佐賀県", label: "佐賀県" },
      { value: "長崎県", label: "長崎県" },
      { value: "熊本県", label: "熊本県" },
      { value: "大分県", label: "大分県" },
      { value: "宮崎県", label: "宮崎県" },
      { value: "鹿児島県", label: "鹿児島県" },
      { value: "沖縄県", label: "沖縄県" },
    ],
  },
  {
    label: "海外",
    items: [{ value: "海外", label: "海外" }],
  },
];
export function regionsAndEmpty(emptyLabel: string): SelectGroup[] {
  return [
    {
      label: "未選択",
      items: [{ value: "", label: emptyLabel }],
    },
    ...regions,
  ];
}
