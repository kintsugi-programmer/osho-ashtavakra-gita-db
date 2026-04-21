# osho-ashtavakra-gita-db

- file structure

```
osho-ashtavakra-gita-db/
│
├── data/
│   ├── raw/                # untouched Hindi text
│   │   ├── ch01.txt
│   │   ├── ch02.txt
│   │   └── ...
│   │
│   ├── processed/          # chunked structured data
│   │   ├── ch01.json
│   │   ├── ch01.csv
│   │   └── ...
│   │
│   └── final/              # cleaned + translated dataset
│
├── scripts/
│   ├── chunker.py
│   ├── converter.py
│   └── utils.py
│
├── notebooks/              # Kaggle later
│
├── README.md
├── requirements.txt
└── .gitignore
```