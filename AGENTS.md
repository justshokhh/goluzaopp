# UzScore — Agentlar Arxitekturasi va Qoidalari

Ushbu hujjat UzScore (O'zbekiston Superligasi va xalqaro jonli futbol natijalari) platformasida ishlovchi barcha agentlar uchun qat'iy yo'riqnoma hisoblanadi.

## 📁 Mas'uliyat Hududlari (Roles & Directory Access)

- `src/types/` -> **Faqat Data Agent** tahrirlaydi.
- `src/services/` -> **Faqat Data Agent** tahrirlaydi.
- `src/components/` -> **Faqat UI Agent** tahrirlaydi.
- `src/store/` -> **Faqat State Agent** tahrirlaydi.
- `src/features/news/` -> **Faqat News Agent** tahrirlaydi.

## ⛔ Qat'iy Arxitektura Qoidalari

1. **Chegara intizomi**: Har bir agent faqat o'ziga biriktirilgan papkada kod yozadi va boshqa agentlarga tegishli papkadagi fayllarga mutlaqo tegmaydi.
2. **Dizayn standarti**: Barcha UI elementlar **SofaScore** uslubida bo'lishi shart:
   - Asosiy fon (Dark Mode): `#0b0e14`
   - Ikkilamchi bloklar foni: `#131722`
   - Jonli (LIVE) indikatorlar va faol aksentlar: `#10b981` (Emerald Green)
   - Ixcham, ma'lumotga boy jadvallar va toza tipografika.
3. **Mavjud fayllarni saqlash**: Mavjud fayllarni hech qachon to'liq o'chirib noldan yozilmaydi — faqat kerakli qatorlar tahrirlanadi yoki yangi funksiyalar qo'shiladi.
4. **Til talabi**: Foydalanuvchi bilan muloqot va tizim tushuntirishlari faqat o'zbek tilida olib boriladi.
