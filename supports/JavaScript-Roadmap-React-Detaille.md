# JavaScript - Roadmap vers React (Version Détaillée)
## De 70% à 100% de préparation - Guide Complet avec Exemples

---

## 1. **Destructuring** 🎯

### Qu'est-ce que c'est ?
Le destructuring permet d'extraire des valeurs d'objets ou de tableaux et de les assigner à des variables de manière concise.

### Objets - Syntaxe de base
```javascript
// Ancienne méthode
const user = { name: "Alice", age: 25, city: "Paris" };
const name = user.name;
const age = user.age;

// Avec destructuring
const { name, age } = user;
console.log(name); // "Alice"
console.log(age);  // 25
```

### Objets - Renommage de variables
```javascript
const user = { name: "Alice", age: 25 };
const { name: userName, age: userAge } = user;
console.log(userName); // "Alice"
console.log(userAge);  // 25
```

### Objets - Valeurs par défaut
```javascript
const user = { name: "Alice" };
const { name, age = 18 } = user; // age prend 18 par défaut
console.log(age); // 18
```

### Tableaux - Syntaxe de base
```javascript
const colors = ["red", "green", "blue", "yellow"];
const [first, second] = colors;
console.log(first);  // "red"
console.log(second); // "green"
```

### Tableaux - Ignorer des éléments
```javascript
const [first, , third] = [1, 2, 3];
console.log(first); // 1
console.log(third); // 3 (on a ignoré le 2)
```

### Dans les paramètres de fonctions
```javascript
// Sans destructuring
button.addEventListener("click", (e) => {
    console.log(e.target);
    console.log(e.type);
});

// Avec destructuring
button.addEventListener("click", ({ target, type }) => {
    console.log(target); // directement accessible
    console.log(type);   // "click"
});
```

### Cas d'usage React
```javascript
// Destructuring des props dans un composant
function UserCard({ name, age, city }) {
    return <div>{name} a {age} ans et vit à {city}</div>;
}

// Destructuring du state
const [count, setCount] = useState(0);
```

---

## 2. **Spread & Rest operators** 🎯

### Spread operator (...) - Étaler un tableau
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Ajouter des éléments
const extended = [...arr1, 99, 100];
console.log(extended); // [1, 2, 3, 99, 100]
```

### Spread operator - Copier un tableau
```javascript
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] - non modifié
console.log(copy);     // [1, 2, 3, 4]
```

### Spread operator - Copier et modifier un objet
```javascript
const user = { name: "Bob", age: 25 };
const updatedUser = { ...user, age: 30, city: "Lyon" };
console.log(updatedUser); 
// { name: "Bob", age: 30, city: "Lyon" }
```

### Spread operator - Fusionner des objets
```javascript
const defaults = { theme: "dark", language: "fr" };
const userPrefs = { language: "en" };
const config = { ...defaults, ...userPrefs };
console.log(config); 
// { theme: "dark", language: "en" } - userPrefs écrase defaults
```

### Rest operator (...) - Rassembler des arguments
```javascript
// Fonction avec nombre variable d'arguments
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

### Rest operator - Dans le destructuring
```javascript
const [first, second, ...others] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(others); // [3, 4, 5]

const { name, ...restProps } = { name: "Alice", age: 25, city: "Paris" };
console.log(name);      // "Alice"
console.log(restProps); // { age: 25, city: "Paris" }
```

### Cas d'usage React
```javascript
// Mise à jour immutable du state
const [items, setItems] = useState([1, 2, 3]);
setItems([...items, 4]); // Ajouter un élément

// Passer toutes les props
function Parent() {
    const props = { name: "Alice", age: 25 };
    return <Child {...props} />;
}
```

---

## 3. **Promises & async/await** 🔥 ESSENTIEL

### Qu'est-ce qu'une Promise ?
Une Promise représente une opération asynchrone qui peut réussir (resolve) ou échouer (reject).

### Création d'une Promise
```javascript
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    if (success) {
        resolve("Opération réussie !");
    } else {
        reject("Erreur !");
    }
});

myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error));
```

### Fetch API - Récupérer des données
```javascript
// Méthode avec .then()
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur réseau");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Erreur:", error);
    });
```

### async/await - Syntaxe moderne
```javascript
async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error("Erreur réseau");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Erreur:", error);
    }
}

// Appel de la fonction
getUsers();
```

### async/await - Attendre plusieurs promises
```javascript
async function getData() {
    try {
        // Exécution séquentielle
        const users = await fetch("/api/users").then(r => r.json());
        const posts = await fetch("/api/posts").then(r => r.json());
        
        return { users, posts };
    } catch (error) {
        console.error(error);
    }
}

// Exécution parallèle (plus rapide)
async function getDataParallel() {
    try {
        const [users, posts] = await Promise.all([
            fetch("/api/users").then(r => r.json()),
            fetch("/api/posts").then(r => r.json())
        ]);
        
        return { users, posts };
    } catch (error) {
        console.error(error);
    }
}
```

### POST request avec fetch
```javascript
async function createUser(userData) {
    try {
        const response = await fetch("https://api.example.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur:", error);
    }
}

// Utilisation
createUser({ name: "Alice", age: 25 });
```

### Cas d'usage React
```javascript
// Dans un useEffect
useEffect(() => {
    async function fetchData() {
        const data = await fetch("/api/users").then(r => r.json());
        setUsers(data);
    }
    fetchData();
}, []);
```

---

## 4. **Modules ES6** 🔥 ESSENTIEL

### Qu'est-ce qu'un module ?
Les modules permettent de diviser le code en fichiers séparés et réutilisables.

### Export nommé (fichier utils.js)
```javascript
// Export individuel
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export const multiply = (a, b) => a * b;

// Export groupé
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
export { subtract, divide };
```

### Export par défaut (fichier Calculator.js)
```javascript
// Un seul export default par fichier
export default class Calculator {
    add(a, b) {
        return a + b;
    }
}

// Ou avec une fonction
export default function greet(name) {
    return `Hello ${name}`;
}
```

### Import nommé (fichier main.js)
```javascript
// Import spécifique
import { add, multiply } from './utils.js';
console.log(add(2, 3));      // 5
console.log(multiply(2, 3)); // 6

// Import avec alias
import { add as sum } from './utils.js';
console.log(sum(2, 3)); // 5

// Import tout
import * as utils from './utils.js';
console.log(utils.add(2, 3));      // 5
console.log(utils.multiply(2, 3)); // 6
```

### Import par défaut
```javascript
// Le nom peut être choisi librement
import Calculator from './Calculator.js';
const calc = new Calculator();

import greet from './greet.js';
console.log(greet("Alice"));
```

### Combiner import default et nommés
```javascript
// fichier utils.js
export default function multiply(a, b) {
    return a * b;
}
export const add = (a, b) => a + b;
export const PI = 3.14;

// fichier main.js
import multiply, { add, PI } from './utils.js';
```

### Cas d'usage React
```javascript
// Composant React (Button.jsx)
export default function Button({ label, onClick }) {
    return <button onClick={onClick}>{label}</button>;
}

// App.jsx
import Button from './components/Button';
import { useState } from 'react';

function App() {
    return <Button label="Cliquez" onClick={() => alert("Test")} />;
}
```

---

## 5. **Array methods avancées** 🎯

### map() - Transformer chaque élément
```javascript
// Transformer des nombres
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8]

// Transformer des objets
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];
const names = users.map(user => user.name);
console.log(names); // ["Alice", "Bob"]

// Créer de nouveaux objets
const formattedUsers = users.map(user => ({
    fullName: user.name.toUpperCase(),
    isAdult: user.age >= 18
}));
```

### filter() - Filtrer les éléments
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]

const users = [
    { name: "Alice", age: 17 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 15 }
];
const adults = users.filter(user => user.age >= 18);
console.log(adults); // [{ name: "Bob", age: 25 }]
```

### reduce() - Réduire à une seule valeur
```javascript
// Somme
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, current) => {
    return accumulator + current;
}, 0); // 0 est la valeur initiale
console.log(sum); // 10

// Compter les occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// Créer un objet à partir d'un tableau
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];
const usersById = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});
console.log(usersById);
// { 1: { id: 1, name: "Alice" }, 2: { id: 2, name: "Bob" } }
```

### find() - Trouver un élément
```javascript
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Bob" }

const notFound = users.find(u => u.id === 999);
console.log(notFound); // undefined
```

### findIndex() - Trouver l'index d'un élément
```javascript
const numbers = [10, 20, 30, 40];
const index = numbers.findIndex(n => n === 30);
console.log(index); // 2
```

### some() - Vérifier si au moins un élément correspond
```javascript
const numbers = [1, 2, 3, 4];
const hasEven = numbers.some(n => n % 2 === 0);
console.log(hasEven); // true

const users = [
    { name: "Alice", age: 17 },
    { name: "Bob", age: 25 }
];
const hasAdult = users.some(u => u.age >= 18);
console.log(hasAdult); // true
```

### every() - Vérifier si tous les éléments correspondent
```javascript
const numbers = [2, 4, 6, 8];
const allEven = numbers.every(n => n % 2 === 0);
console.log(allEven); // true

const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];
const allAdults = users.every(u => u.age >= 18);
console.log(allAdults); // true
```

### Chaînage de méthodes
```javascript
const users = [
    { name: "Alice", age: 17, active: true },
    { name: "Bob", age: 25, active: true },
    { name: "Charlie", age: 30, active: false },
    { name: "David", age: 22, active: true }
];

const activeAdultNames = users
    .filter(u => u.active)           // Garder seulement les actifs
    .filter(u => u.age >= 18)        // Garder seulement les adultes
    .map(u => u.name)                // Extraire seulement les noms
    .sort();                          // Trier alphabétiquement

console.log(activeAdultNames); // ["Bob", "David"]
```

### Cas d'usage React
```javascript
// Afficher une liste d'éléments
function UserList({ users }) {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}

// Filtrer et afficher
function ActiveUsers({ users }) {
    const activeUsers = users.filter(u => u.active);
    return (
        <div>
            {activeUsers.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}
```

---

## 6. **Optional chaining & Nullish coalescing**

### Optional chaining (?.) - Accès sécurisé aux propriétés
```javascript
// Sans optional chaining
const user = { name: "Alice" };
// Risque d'erreur si user.profile est undefined
// const city = user.profile.address.city; // ❌ TypeError

// Vérification manuelle
const city = user && user.profile && user.profile.address 
    ? user.profile.address.city 
    : undefined;

// Avec optional chaining
const citySafe = user?.profile?.address?.city;
console.log(citySafe); // undefined (pas d'erreur)
```

### Optional chaining avec les tableaux
```javascript
const data = {
    users: [
        { name: "Alice", posts: [{ title: "Hello" }] },
        { name: "Bob" }
    ]
};

const firstPost = data.users?.[0]?.posts?.[0]?.title;
console.log(firstPost); // "Hello"

const bobPosts = data.users?.[1]?.posts?.[0]?.title;
console.log(bobPosts); // undefined
```

### Optional chaining avec les fonctions
```javascript
const user = {
    name: "Alice",
    greet: () => "Hello"
};

console.log(user.greet?.()); // "Hello"
console.log(user.goodbye?.()); // undefined (pas d'erreur)
```

### Nullish coalescing (??) - Valeur par défaut
```javascript
// Ancienne méthode avec || (problème avec 0, false, "")
const port1 = 0 || 3000;
console.log(port1); // 3000 (mais on voulait 0 !)

// Avec ?? (seulement null/undefined)
const port2 = 0 ?? 3000;
console.log(port2); // 0 ✅

const config = {
    timeout: 0,
    retries: null,
    debug: false
};

const timeout = config.timeout ?? 5000;
const retries = config.retries ?? 3;
const debug = config.debug ?? true;

console.log(timeout); // 0 (valeur configurée)
console.log(retries); // 3 (valeur par défaut car null)
console.log(debug);   // false (valeur configurée)
```

### Combiner ?. et ??
```javascript
const user = { name: "Alice" };
const displayName = user?.profile?.name ?? "Anonyme";
console.log(displayName); // "Anonyme"
```

### Cas d'usage React
```javascript
function UserProfile({ user }) {
    return (
        <div>
            <h1>{user?.name ?? "Utilisateur inconnu"}</h1>
            <p>{user?.profile?.bio ?? "Pas de bio"}</p>
            <button onClick={user?.onEdit?.()}>Éditer</button>
        </div>
    );
}
```

---

## 7. **Classes ES6** (utile mais moins prioritaire)

### Création de classe de base
```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Bonjour, je suis ${this.name}`;
    }
    
    isAdult() {
        return this.age >= 18;
    }
}

const user = new User("Alice", 25);
console.log(user.greet());    // "Bonjour, je suis Alice"
console.log(user.isAdult());  // true
```

### Propriétés et méthodes statiques
```javascript
class MathUtils {
    static PI = 3.14159;
    
    static square(x) {
        return x * x;
    }
    
    static max(...numbers) {
        return Math.max(...numbers);
    }
}

console.log(MathUtils.PI);        // 3.14159
console.log(MathUtils.square(5)); // 25
console.log(MathUtils.max(1, 5, 3)); // 5
```

### Héritage (extends)
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} fait un bruit`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Appelle le constructeur parent
        this.breed = breed;
    }
    
    speak() {
        return `${this.name} aboie !`;
    }
    
    fetch() {
        return `${this.name} rapporte la balle`;
    }
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.speak());  // "Rex aboie !"
console.log(dog.fetch());  // "Rex rapporte la balle"
```

### Getters et Setters
```javascript
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    get area() {
        return this.width * this.height;
    }
    
    get perimeter() {
        return 2 * (this.width + this.height);
    }
    
    set dimensions({ width, height }) {
        this.width = width;
        this.height = height;
    }
}

const rect = new Rectangle(10, 5);
console.log(rect.area);      // 50 (pas besoin de ())
console.log(rect.perimeter); // 30

rect.dimensions = { width: 20, height: 10 };
console.log(rect.area);      // 200
```

### Propriétés privées (#)
```javascript
class BankAccount {
    #balance = 0; // Propriété privée
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        this.#balance += amount;
        return this.#balance;
    }
    
    withdraw(amount) {
        if (amount > this.#balance) {
            throw new Error("Fonds insuffisants");
        }
        this.#balance -= amount;
        return this.#balance;
    }
    
    get balance() {
        return this.#balance;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.balance); // 1500
// console.log(account.#balance); // ❌ Erreur : propriété privée
```

### Cas d'usage React
```javascript
// Les class components (ancienne méthode, remplacée par hooks)
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    
    increment = () => {
        this.setState({ count: this.state.count + 1 });
    }
    
    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>+1</button>
            </div>
        );
    }
}
```

---

## 8. **Local Storage**

### Qu'est-ce que le Local Storage ?
Le Local Storage permet de stocker des données dans le navigateur de manière persistante (elles restent même après fermeture du navigateur).

### Sauvegarder des données simples
```javascript
// Sauvegarder une chaîne
localStorage.setItem("username", "Alice");

// Sauvegarder un nombre (sera converti en string)
localStorage.setItem("score", "150");

// Sauvegarder un booléen (sera converti en string)
localStorage.setItem("isDarkMode", "true");
```

### Sauvegarder des objets (JSON)
```javascript
const user = {
    name: "Alice",
    age: 25,
    preferences: {
        theme: "dark",
        language: "fr"
    }
};

// Convertir en JSON avant de sauvegarder
localStorage.setItem("user", JSON.stringify(user));
```

### Récupérer des données
```javascript
// Récupérer une chaîne
const username = localStorage.getItem("username");
console.log(username); // "Alice"

// Récupérer un objet (penser à parser)
const userJSON = localStorage.getItem("user");
const user = JSON.parse(userJSON);
console.log(user.name); // "Alice"
console.log(user.preferences.theme); // "dark"
```

### Vérifier si une clé existe
```javascript
const theme = localStorage.getItem("theme");
if (theme === null) {
    console.log("Pas de thème sauvegardé");
    localStorage.setItem("theme", "light");
} else {
    console.log(`Thème: ${theme}`);
}

// Avec optional chaining et nullish coalescing
const savedTheme = localStorage.getItem("theme") ?? "light";
```

### Supprimer des données
```javascript
// Supprimer une clé spécifique
localStorage.removeItem("username");

// Tout supprimer
localStorage.clear();
```

### Exemple complet : Sauvegarder des préférences
```javascript
// Sauvegarder les préférences
function savePreferences(prefs) {
    localStorage.setItem("preferences", JSON.stringify(prefs));
}

// Charger les préférences
function loadPreferences() {
    const saved = localStorage.getItem("preferences");
    if (saved) {
        return JSON.parse(saved);
    }
    // Valeurs par défaut
    return {
        theme: "light",
        language: "fr",
        notifications: true
    };
}

// Utilisation
const prefs = loadPreferences();
console.log(prefs);

// Modifier et sauvegarder
prefs.theme = "dark";
savePreferences(prefs);
```

### Exemple : Panier d'achat
```javascript
// Ajouter un produit au panier
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Récupérer le panier
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

// Vider le panier
function clearCart() {
    localStorage.removeItem("cart");
}

// Utilisation
addToCart({ id: 1, name: "T-shirt", price: 20 });
addToCart({ id: 2, name: "Pantalon", price: 50 });
console.log(getCart());
```

### Gestion des erreurs
```javascript
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error("Erreur sauvegarde:", error);
        // Peut arriver si quota dépassé ou mode privé
        return false;
    }
}

function loadData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Erreur chargement:", error);
        return null;
    }
}
```

### Cas d'usage React
```javascript
// Hook personnalisé pour le Local Storage
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}

// Utilisation
function App() {
    const [theme, setTheme] = useLocalStorage("theme", "light");
    const [user, setUser] = useLocalStorage("user", null);
    
    return (
        <div className={theme}>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                Toggle Theme
            </button>
        </div>
    );
}
```

---

## 9. **Ternaires & short-circuit**

### Opérateur ternaire - Syntaxe de base
```javascript
// Syntaxe: condition ? valeurSiVrai : valeurSiFaux

const age = 20;
const status = age >= 18 ? "adulte" : "mineur";
console.log(status); // "adulte"

// Équivalent avec if/else
let status2;
if (age >= 18) {
    status2 = "adulte";
} else {
    status2 = "mineur";
}
```

### Ternaires dans les fonctions
```javascript
function getDiscount(isMember) {
    return isMember ? 0.2 : 0.05;
}

console.log(getDiscount(true));  // 0.2 (20%)
console.log(getDiscount(false)); // 0.05 (5%)
```

### Ternaires imbriqués (à utiliser avec modération)
```javascript
const score = 75;
const grade = score >= 90 ? "A" 
            : score >= 80 ? "B"
            : score >= 70 ? "C"
            : score >= 60 ? "D"
            : "F";
console.log(grade); // "C"
```

### Short-circuit avec && (ET logique)
```javascript
// Si la condition est vraie, exécute la partie droite
const isLoggedIn = true;
isLoggedIn && console.log("Bienvenue !"); // Affiche "Bienvenue !"

const user = { name: "Alice" };
user && console.log(user.name); // Affiche "Alice"

// Équivalent à :
if (user) {
    console.log(user.name);
}
```

### Short-circuit avec || (OU logique)
```javascript
// Retourne la première valeur truthy
const username = "";
const displayName = username || "Anonyme";
console.log(displayName); // "Anonyme"

const count = 0;
const displayCount = count || 10;
console.log(displayCount); // 10 (attention avec 0 !)

// Meilleur avec ?? pour gérer 0
const displayCountBetter = count ?? 10;
console.log(displayCountBetter); // 0
```

### Combinaisons utiles
```javascript
// Valider et exécuter
const user = { name: "Alice", isAdmin: true };
user.isAdmin && deleteUser(); // Exécute seulement si admin

// Valeur par défaut avec ||
function greet(name) {
    name = name || "Invité";
    return `Bonjour ${name}`;
}

// Affectation conditionnelle
let message;
const hasError = false;
hasError && (message = "Une erreur s'est produite");
console.log(message); // undefined
```

### Cas d'usage React - Rendu conditionnel
```javascript
function UserGreeting({ user }) {
    return (
        <div>
            {/* Avec ternaire */}
            {user ? (
                <h1>Bienvenue {user.name}</h1>
            ) : (
                <h1>Veuillez vous connecter</h1>
            )}
            
            {/* Avec short-circuit && */}
            {user && <p>Email: {user.email}</p>}
            {user?.isAdmin && <button>Panneau admin</button>}
            
            {/* Classe conditionnelle */}
            <div className={user?.isPremium ? "premium" : "free"}>
                Contenu
            </div>
        </div>
    );
}

function TodoList({ todos }) {
    return (
        <div>
            {todos.length > 0 ? (
                <ul>
                    {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
                </ul>
            ) : (
                <p>Aucune tâche</p>
            )}
        </div>
    );
}
```

---

## 10. **Error handling robuste**

### Try/catch de base
```javascript
try {
    // Code qui peut causer une erreur
    const data = JSON.parse('{"name": "Alice"}');
    console.log(data.name); // "Alice"
} catch (error) {
    // Gérer l'erreur
    console.error("Erreur:", error.message);
}
```

### Gérer les erreurs JSON
```javascript
function parseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("JSON invalide:", error.message);
        return null;
    }
}

const valid = parseJSON('{"name": "Alice"}');
console.log(valid); // { name: "Alice" }

const invalid = parseJSON('invalid json');
console.log(invalid); // null
```

### Finally - Code qui s'exécute toujours
```javascript
function loadData() {
    let loading = true;
    
    try {
        console.log("Chargement...");
        const data = fetchDataFromAPI(); // Peut échouer
        console.log("Données chargées:", data);
    } catch (error) {
        console.error("Erreur:", error.message);
    } finally {
        // S'exécute TOUJOURS, même si erreur
        loading = false;
        console.log("Fin du chargement");
    }
}
```

### Lancer des erreurs personnalisées (throw)
```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division par zéro impossible");
    }
    return a / b;
}

try {
    const result = divide(10, 0);
    console.log(result);
} catch (error) {
    console.error("Erreur:", error.message);
    // "Erreur: Division par zéro impossible"
}
```

### Créer des classes d'erreurs personnalisées
```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
    }
}

function validateUser(user) {
    if (!user.name) {
        throw new ValidationError("Le nom est requis");
    }
    if (!user.email) {
        throw new ValidationError("L'email est requis");
    }
}

try {
    validateUser({ name: "Alice" });
} catch (error) {
    if (error instanceof ValidationError) {
        console.error("Erreur de validation:", error.message);
    } else {
        console.error("Erreur inconnue:", error);
    }
}
```

### Gestion d'erreurs avec async/await
```javascript
async function fetchUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new NetworkError(
                "Erreur réseau",
                response.status
            );
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error(`Erreur ${error.statusCode}:`, error.message);
        } else if (error instanceof SyntaxError) {
            console.error("Erreur de parsing JSON");
        } else {
            console.error("Erreur inconnue:", error);
        }
        return null;
    }
}
```

### Gestion globale des erreurs
```javascript
// Attraper les erreurs non gérées
window.addEventListener("error", (event) => {
    console.error("Erreur globale:", event.error);
    // Envoyer à un service de logging
});

// Attraper les promises rejetées non gérées
window.addEventListener("unhandledrejection", (event) => {
    console.error("Promise rejetée:", event.reason);
});
```

### Pattern de validation complète
```javascript
function validateAndProcess(data) {
    const errors = [];
    
    // Validation
    if (!data.name) errors.push("Nom requis");
    if (!data.email) errors.push("Email requis");
    if (data.age && data.age < 0) errors.push("Âge invalide");
    
    // Si erreurs, les retourner
    if (errors.length > 0) {
        return { success: false, errors };
    }
    
    // Traitement
    try {
        const result = processData(data);
        return { success: true, data: result };
    } catch (error) {
        return { 
            success: false, 
            errors: [error.message] 
        };
    }
}

// Utilisation
const result = validateAndProcess({ name: "Alice" });
if (result.success) {
    console.log("Succès:", result.data);
} else {
    console.error("Erreurs:", result.errors);
}
```

### Cas d'usage React
```javascript
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${userId}`);
                
                if (!response.ok) {
                    throw new Error("Utilisateur introuvable");
                }
                
                const data = await response.json();
                setUser(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        
        fetchUser();
    }, [userId]);
    
    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;
    if (!user) return <div>Aucun utilisateur</div>;
    
    return <div>Bienvenue {user.name}</div>;
}
```

---

# 🎯 Priorités pour React

## Ordre d'apprentissage recommandé :

1. ✅ **Promises & async/await** - Indispensable pour les appels API
   - Comprendre les Promises
   - Maîtriser async/await
   - Utiliser fetch pour récupérer des données
   - Gérer les erreurs avec try/catch

2. ✅ **Modules ES6** - React utilise import/export partout
   - Export/import nommés
   - Export/import par défaut
   - Organiser le code en modules

3. ✅ **Destructuring** - Très utilisé dans React (props, state, hooks)
   - Destructuring d'objets
   - Destructuring de tableaux
   - Dans les paramètres de fonctions

4. ✅ **Array methods** - map() notamment pour afficher des listes
   - map() pour transformer et afficher
   - filter() pour filtrer les données
   - find() pour chercher un élément
   - reduce() pour agréger

5. ✅ **Spread operator** - Manipulation d'état immutable
   - Copier des objets/tableaux
   - Fusionner des données
   - Mise à jour immutable du state

6. **Optional chaining** - Éviter les bugs
   - Accès sécurisé aux propriétés
   - Combiner avec ??

7. **Ternaires** - Rendu conditionnel en JSX
   - Conditions simples
   - Short-circuit avec &&

8. **Local Storage** - Persistance de données
   - Sauvegarder/récupérer des données
   - Gérer les préférences utilisateur

9. **Error handling** - Applications robustes
   - Try/catch avec async/await
   - Gérer les erreurs réseau
   - Afficher des messages d'erreur

---

# 📚 Concepts déjà maîtrisés (70%)

- ✅ Sélection DOM (querySelector, querySelectorAll)
- ✅ Événements (addEventListener, preventDefault, stopPropagation)
- ✅ Manipulation DOM (classList, style, innerHTML)
- ✅ Template literals
- ✅ Fonctions fléchées
- ✅ forEach sur NodeList
- ✅ setTimeout
- ✅ Window API (scroll, mousemove)
- ✅ Forms (input, select, checkbox)
- ✅ Event bubbling et capturing

---

# 🚀 Timeline recommandée

**2-3 semaines** pour passer de 70% à 100% :

### Semaine 1 : Asynchrone
- **Jour 1-2** : Promises (création, chaînage)
- **Jour 3-4** : async/await et fetch API
- **Jour 5-7** : Pratique intensive avec API publiques

### Semaine 2 : Structures de données
- **Jour 1-2** : Modules ES6 (export/import)
- **Jour 3-4** : Destructuring (objets, tableaux, paramètres)
- **Jour 5-7** : Spread/Rest operators

### Semaine 3 : Méthodes avancées
- **Jour 1-3** : Array methods (map, filter, reduce, find)
- **Jour 4-5** : Optional chaining, ternaires, Local Storage
- **Jour 6-7** : Error handling et révisions

### Après : **Prêt pour React !**

---

# 💡 Exercices pratiques recommandés

## Exercice 1 : API + Array methods
Créer une application qui :
- Récupère une liste d'utilisateurs depuis une API
- Affiche seulement les adultes
- Trie par nom
- Permet de chercher par nom

## Exercice 2 : Todo List avec Local Storage
Créer une todo list qui :
- Ajoute/supprime des tâches
- Sauvegarde dans Local Storage
- Filtre par statut (complétées/actives)
- Persiste après rechargement

## Exercice 3 : Gestion d'erreurs
Créer un formulaire qui :
- Valide les données
- Envoie à une API
- Gère les erreurs réseau
- Affiche des messages appropriés

---

*Document généré le 8 janvier 2026*
