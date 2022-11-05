import '@testing-library/jest-dom/extend-expect'

jest.mock('firebase/auth', () => ({
    signOut: jest.fn(),
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    signInWithPopup: jest.fn(),
    TwitterAuthProvider: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
}))

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    addDoc: jest.fn(),
    collection: jest.fn(),
    query: jest.fn(),
    getDocs: jest.fn(),
    where: jest.fn(),
}))

jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: jest.fn(),
}))
