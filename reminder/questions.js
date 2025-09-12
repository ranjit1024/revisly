export default[
  {
    "id": 1,
    "question": "What is the primary purpose of the `Copy` trait in Rust?",
    "options": [
      "To enable ownership transfer between variables",
      "To provide a deep copy of a value",
      "To implement a custom clone method",
      "To enable moving data between variables"
    ],
    "correctAnswer": 2,
    "explanation": "The `Copy` trait in Rust allows for deep copies of values, enabling the creation of new values without changing the original value."
  },
  {
    "id": 2,
    "question": "What is the difference between `clone()` and `copy()` in Rust?",
    "options": [
      "`clone()` creates a new reference, while `copy()` creates a new value",
      "`clone()` is faster than `copy()`",
      "`copy()` is only for primitive types, while `clone()` is for custom types",
      "`clone()` creates a new value, while `copy()` creates a new reference"
    ],
    "correctAnswer": 0,
    "explanation": "In Rust, `clone()` creates a new value, while `copy()` creates a new reference. This distinction is important when working with custom types."
  },
  {
    "id": 3,
    "question": "What is the purpose of the `std::rc::Rc` module in Rust?",
    "options": [
      "To manage memory for custom types",
      "To create a thread-safe reference to a value",
      "To implement a custom move trait",
      "To create a weak reference to a value"
    ],
    "correctAnswer": 1,
    "explanation": "The `std::rc::Rc` module in Rust provides a way to manage shared ownership of values, making it a useful tool for creating thread-safe references."
  },
  {
    "id": 4,
    "question": "What is the difference between a `struct` and an `enum` in Rust?",
    "options": [
      "A `struct` can only contain primitive types, while an `enum` can contain custom types",
      "A `struct` is a collection of named fields, while an `enum` is a collection of named variants",
      "A `struct` is used for value-based programming, while an `enum` is used for object-oriented programming",
      "A `struct` is immutable, while an `enum` is mutable"
    ],
    "correctAnswer": 1,
    "explanation": "In Rust, a `struct` is a collection of named fields, while an `enum` is a collection of named variants. This distinction is important when choosing between the two data structures."
  },
  {
    "id": 5,
    "question": "What is the purpose of the `?` operator in Rust?",
    "options": [
      "To propagate an error from a method to the caller",
      "To perform a lazy evaluation of an expression",
      "To enable pattern matching on a value",
      "To create a new scope for a block of code"
    ],
    "correctAnswer": 0,
    "explanation": "The `?` operator in Rust is used to propagate an error from a method to the caller, making it a useful tool for error handling."
  },
  {
    "id": 6,
    "question": "What is the purpose of the `Arc` module in Rust?",
    "options": [
      "To create a thread-safe reference to a value",
      "To implement a custom move trait",
      "To create a weak reference to a value",
      "To enable shared ownership of a value"
    ],
    "correctAnswer": 3,
    "explanation": "The `Arc` module in Rust provides a way to enable shared ownership of a value, making it a useful tool for creating thread-safe references."
  },
  {
    "id": 7,
    "question": "What is the difference between `&` and `&mut` in Rust?",
    "options": [
      "`&` is used for immutable borrows, while `&mut` is used for mutable borrows",
      "`&` is used for mutable borrows, while `&mut` is used for immutable borrows",
      "`&` enables simultaneous reads, while `&mut` enables simultaneous writes",
      "`&` enables simultaneous writes, while `&mut` enables simultaneous reads"
    ],
    "correctAnswer": 0,
    "explanation": "In Rust, `&` is used for immutable borrows, while `&mut` is used for mutable borrows. This distinction is important when working with shared state."
  },
  {
    "id": 8,
    "question": "What is the purpose of the `match` statement in Rust?",
    "options": [
      "To perform a pattern matching on a value",
      "To enable a lazy evaluation of an expression",
      "To create a new scope for a block of code",
      "To propagate an error from a method to the caller"
    ],
    "correctAnswer": 0,
    "explanation": "The `match` statement in Rust is used to perform pattern matching on a value, making it a useful tool for conditional logic."
  },
  {
    "id": 9,
    "question": "What is the difference between `std::sync::Mutex` and `std::sync::RwLock` in Rust?",
    "options": [
      "`Mutex` enables exclusive access to a resource, while `RwLock` enables shared access",
      "`Mutex` enables shared access to a resource, while `RwLock` enables exclusive access",
      "`Mutex` is used for mutable state, while `RwLock` is used for immutable state",
      "`Mutex` is used for immutable state, while `RwLock` is used for mutable state"
    ],
    "correctAnswer": 0,
    "explanation": "In Rust, `Mutex` is used to enable exclusive access to a resource, while `RwLock` is used to enable shared access."
  },
  {
    "id": 10,
    "question": "What is the purpose of the `std::thread` module in Rust?",
    "options": [
      "To create a new thread",
      "To enable shared ownership of a value",
      "To implement a custom move trait",
      "To propagate an error from a method to the caller"
    ],
    "correctAnswer": 0,
    "explanation": "The `std::thread` module in Rust provides a way to create new threads, making it a useful tool for concurrency."
  }
]