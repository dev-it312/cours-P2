# JavaScript - Roadmap vers React
## De 70% à 100% de préparation

---

## 1. **Destructuring** 🎯

### Objets
```javascript
const user = { name: "Alice", age: 25 };
const { name, age } = user;
```

### Tableaux
```javascript
const [first, second] = [1, 2, 3];
```

### Dans les paramètres
```javascript
button.addEventListener("click", ({ target }) => {
    console.log(target); // au lieu de e.target
});
```

---

## 2. **Spread & Rest operators** 🎯

### Spread : étaler un tableau
```javascript
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
```

### Copier un objet
```javascript
const user = { name: "Bob" };
const updatedUser = { ...user, age: 30 };
```

### Rest : rassembler des arguments
```javascript
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b);
}
```

---

## 3. **Promises & async/await** 🔥 ESSENTIEL

### Fetch API
```javascript
async function getUsers() {
    try {
        const response = await fetch("https://api.example.com/users");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

### Chaînage de promises
```javascript
fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

---

## 4. **Modules ES6** 🔥 ESSENTIEL

### Export (fichier utils.js)
```javascript
export const add = (a, b) => a + b;
export default function multiply(a, b) { 
    return a * b; 
}
```

### Import (fichier main.js)
```javascript
import multiply, { add } from './utils.js';
```

---

## 5. **Array methods avancées** 🎯

### map : transformer chaque élément
```javascript
const doubled = [1, 2, 3].map(n => n * 2); // [2, 4, 6]
```

### filter : filtrer
```javascript
const evens = [1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]
```

### reduce : réduire à une valeur
```javascript
const sum = [1, 2, 3].reduce((acc, n) => acc + n, 0); // 6
```

### find, some, every
```javascript
const user = users.find(u => u.id === 5);
const hasAdult = users.some(u => u.age >= 18);
const allAdults = users.every(u => u.age >= 18);
```

---

## 6. **Optional chaining & Nullish coalescing**

### Optional chaining (?.)
```javascript
const userName = user?.profile?.name; 
// pas d'erreur si user est null
```

### Nullish coalescing (??)
```javascript
const port = config.port ?? 3000; 
// 3000 si port est null/undefined
```

---

## 7. **Classes ES6** (utile mais moins prioritaire)

```javascript
class User {
    constructor(name) {
        this.name = name;
    }
    
    greet() {
        return `Hello ${this.name}`;
    }
}

const user = new User("Alice");
console.log(user.greet());
```

---

## 8. **Local Storage**

### Sauvegarder
```javascript
localStorage.setItem("user", JSON.stringify({ name: "Alice" }));
```

### Récupérer
```javascript
const user = JSON.parse(localStorage.getItem("user"));
```

### Supprimer
```javascript
localStorage.removeItem("user");
localStorage.clear(); // tout supprimer
```

---

## 9. **Ternaires & short-circuit**

### Ternaire
```javascript
const status = age >= 18 ? "adult" : "minor";
```

### Short-circuit
```javascript
const name = userName || "Anonymous";
isLoggedIn && showDashboard();
```

---

## 10. **Error handling robuste**

```javascript
try {
    const data = JSON.parse(invalidJSON);
} catch (error) {
    console.error("Parse error:", error.message);
} finally {
    cleanup(); // s'exécute toujours
}
```

---

# 🎯 Priorités pour React

## Ordre d'apprentissage recommandé :

1. ✅ **Promises & async/await** - indispensable pour les appels API
2. ✅ **Modules ES6** - React utilise import/export partout
3. ✅ **Destructuring** - très utilisé dans React (props, state)
4. ✅ **Array methods** - .map() notamment pour afficher des listes
5. ✅ **Spread operator** - manipulation d'état immutable
6. **Optional chaining** - éviter les bugs
7. **Ternaires** - rendu conditionnel en JSX
8. **Local Storage** - persistance de données

---

# 📚 Concepts déjà maîtrisés (70%)

- ✅ Sélection DOM (querySelector, querySelectorAll)
- ✅ Événements (addEventListener, preventDefault)
- ✅ Manipulation DOM (classList, style, innerHTML)
- ✅ Template literals
- ✅ Fonctions fléchées
- ✅ forEach sur NodeList
- ✅ setTimeout
- ✅ Window API (scroll, mousemove)

---

# 🚀 Timeline recommandée

**2-3 semaines** pour passer de 70% à 100% :

- **Semaine 1** : Promises, async/await, fetch API
- **Semaine 2** : Modules ES6, destructuring, spread
- **Semaine 3** : Array methods avancées, pratique intensive

Après : **Prêt pour React !**

---

*Document généré le 7 janvier 2026*
