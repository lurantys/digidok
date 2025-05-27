export const quizData = [
  {
    id: 1,
    question: "What is the primary purpose of a digital signature?",
    options: [
      "To encrypt data",
      "To verify the authenticity and integrity of a message",
      "To compress files",
      "To store passwords"
    ],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "Digital signatures are used to verify the authenticity and integrity of digital messages or documents."
  },
  {
    id: 2,
    question: "Which of the following is NOT a characteristic of a secure digital signature?",
    options: [
      "Non-repudiation",
      "Reversibility",
      "Authentication",
      "Integrity"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "Digital signatures should be irreversible to ensure non-repudiation. The ability to reverse a signature would compromise its security."
  },
  {
    id: 3,
    question: "What is the role of a Certificate Authority (CA) in digital signatures?",
    options: [
      "To create digital signatures",
      "To verify and issue digital certificates",
      "To encrypt messages",
      "To store private keys"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "Certificate Authorities are trusted entities that verify and issue digital certificates, which are essential for establishing trust in digital signatures."
  },
  {
    id: 4,
    question: "Which cryptographic algorithm is commonly used for creating digital signatures?",
    options: [
      "AES",
      "RSA",
      "MD5",
      "DES"
    ],
    correctAnswer: 1,
    difficulty: "hard",
    explanation: "RSA (Rivest-Shamir-Adleman) is one of the most widely used algorithms for digital signatures, along with ECDSA and DSA."
  },
  {
    id: 5,
    question: "What is the difference between a digital signature and a digital certificate?",
    options: [
      "They are the same thing",
      "A digital signature verifies a message, while a digital certificate verifies an identity",
      "A digital certificate is used for encryption, while a digital signature is for authentication",
      "Digital signatures are more secure than digital certificates"
    ],
    correctAnswer: 1,
    difficulty: "hard",
    explanation: "A digital signature is used to verify the authenticity of a message, while a digital certificate is used to verify the identity of the sender."
  }
]; 