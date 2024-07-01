# Todo aplikace

**Spuštění**
```
npm install
npm run dev
```

**Appku jsem postavil přes Vite bundler, protože:**

- create-react-app je deprecated
- vite nabízí lepší dev server
- rychlejší build a kompliace TypeScriptu, což je super, pokud se appka hostuje na cloudové platformě, kde chceme ušetřit každý megabajt a vteřinu

**Co appka umí?**

_Zadání bylo prostě jen vytvořit todo appku, takže jsem se snažil zanechat věci simple a řešení nepřestřelit. Nicméně jsem appku rozšířil alespoň o jednoduché funkcionality:_

- Zápis nového úkolu funguje při stisknutí enteru
- Appka ukládá úkoly na localstorage, takže při ukončení relace mi úkoly nezmizí
- Můžu posouvat úkoly nahoru a dolů, pod čímž si můžu představit třeba prioritu úkolu
- Appka používá state manager Zustand
