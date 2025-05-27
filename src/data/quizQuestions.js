export const questions = [
  // Basic Concepts (30%)
  {
    id: 1,
    category: "AI Fundamentals",
    difficulty: "basic",
    question: "Which of the following best describes supervised learning in healthcare AI?",
    options: [
      "Training models with labeled medical data",
      "Using reinforcement learning for diagnosis",
      "Implementing unsupervised clustering",
      "Applying transfer learning from non-medical domains"
    ],
    correctAnswer: 0,
    explanation: "Supervised learning in healthcare requires labeled medical data to train models effectively."
  },
  {
    id: 2,
    category: "AI Fundamentals",
    difficulty: "basic",
    question: "What is the primary purpose of data preprocessing in healthcare AI?",
    options: [
      "To reduce computational costs",
      "To ensure data quality and standardization",
      "To increase model complexity",
      "To speed up training time"
    ],
    correctAnswer: 1,
    explanation: "Data preprocessing ensures data quality and standardization, which is crucial for reliable AI predictions in healthcare."
  },
  {
    id: 3,
    category: "AI Fundamentals",
    difficulty: "basic",
    question: "Which type of AI is most commonly used for medical image analysis?",
    options: [
      "Rule-based expert systems",
      "Convolutional Neural Networks (CNNs)",
      "Reinforcement learning",
      "Natural Language Processing"
    ],
    correctAnswer: 1,
    explanation: "CNNs are specifically designed for image processing and are the most common AI architecture for medical image analysis."
  },

  // Intermediate Applications (40%)
  {
    id: 4,
    category: "Clinical Applications",
    difficulty: "intermediate",
    question: "What is the primary advantage of using AI in medical imaging?",
    options: [
      "Reducing healthcare costs",
      "Improving diagnostic accuracy and speed",
      "Eliminating the need for radiologists",
      "Simplifying hospital workflows"
    ],
    correctAnswer: 1,
    explanation: "AI in medical imaging primarily enhances diagnostic accuracy and processing speed."
  },
  {
    id: 5,
    category: "Clinical Applications",
    difficulty: "intermediate",
    question: "Which regulatory framework is most relevant for AI medical devices in the US?",
    options: [
      "HIPAA",
      "GDPR",
      "FDA's SaMD framework",
      "ISO 13485"
    ],
    correctAnswer: 2,
    explanation: "The FDA's Software as a Medical Device (SaMD) framework specifically addresses AI medical devices."
  },
  {
    id: 6,
    category: "Clinical Applications",
    difficulty: "intermediate",
    question: "What is the main challenge in implementing AI in electronic health records (EHR)?",
    options: [
      "Computing power limitations",
      "Data interoperability and standardization",
      "Cost of implementation",
      "Staff training requirements"
    ],
    correctAnswer: 1,
    explanation: "Data interoperability and standardization across different EHR systems is the primary challenge."
  },

  // Advanced Topics (30%)
  {
    id: 7,
    category: "Advanced Topics",
    difficulty: "advanced",
    question: "A hospital is implementing a deep learning model for diabetic retinopathy screening. The model achieved 95% sensitivity and 90% specificity in validation. However, in real-world deployment, the positive predictive value dropped to 60%. What is the most likely cause?",
    options: [
      "Model overfitting to validation data",
      "Population prevalence difference between validation and deployment",
      "Hardware differences affecting image quality",
      "Physician resistance to AI recommendations"
    ],
    correctAnswer: 1,
    explanation: "The drop in PPV is most likely due to differences in disease prevalence between the validation and deployment populations."
  },
  {
    id: 8,
    category: "Advanced Topics",
    difficulty: "advanced",
    question: "What is the primary purpose of explainable AI (XAI) in healthcare?",
    options: [
      "To improve model accuracy",
      "To reduce computational costs",
      "To provide transparency and build trust",
      "To speed up model training"
    ],
    correctAnswer: 2,
    explanation: "XAI in healthcare primarily aims to provide transparency in AI decisions and build trust among healthcare professionals."
  },
  {
    id: 9,
    category: "Advanced Topics",
    difficulty: "expert",
    question: "In federated learning for healthcare, what is the main advantage over traditional centralized learning?",
    options: [
      "Faster training time",
      "Better model accuracy",
      "Preservation of data privacy",
      "Lower computational requirements"
    ],
    correctAnswer: 2,
    explanation: "Federated learning allows model training across multiple institutions while keeping the data local, preserving privacy."
  },
  {
    id: 10,
    category: "Advanced Topics",
    difficulty: "expert",
    question: "What is the most critical consideration when implementing AI for clinical decision support?",
    options: [
      "Model accuracy metrics",
      "Integration with existing workflows",
      "Computational efficiency",
      "Cost of implementation"
    ],
    correctAnswer: 1,
    explanation: "Successful AI implementation in clinical settings depends heavily on seamless integration with existing clinical workflows."
  }
]; 