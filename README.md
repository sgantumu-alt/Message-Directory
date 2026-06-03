# Exercise-3 REACT NATIVE MESSAGE DIRECTORY

Sansarmaa Gantumur /1313249/

## Overview
This project presents the design and implementation of a Message directory mobile application developed using React Native, Expo and Typescript. The application provides a modern directory based messaging system where users can organize messages into different folders and access them efficiently through a clean mobile interface.

The main objective of this project are:

* Design a functional messages storage application
* Implement directory navigation and organization
* Provide login and user interaction features
* Implement search functionality for directories and messages
* Support file upload functionality
* Create responsive mobile interfaces
* Support Android Emulator and Web environments

---

## Technology Stack

| Technology         | Purpose                                     |
| ------------------ | ------------------------------------------- |
| React Native       | Cross-platform mobile application framework |
| Expo               | Mobile development and deployment platform  |
| TypeScript         | typed programming language                  |
| Android Studio     | Android Emulator and testing                |
| Expo Go            | Mobile application preview                  |
| Visual Studio Code | Development Environment                     |

---

## Project structure

```plaintext
msg-storage/

├── assets/
├── components/
├── App.tsx
├── index.ts
├── package.json
├── tsconfig.json
├── app.json
├── README.md
└── package-lock.json
```

---

## The application requires:

* Node.js
* Expo SDK
* React Native
* Visual Studio Code
* Android Studio
* Android Emulator /Pixel 9 API 37/
* Expo Go

---

## Application purpose

Message director was developed to organize and store messages using categorized directories

The application allows users to:

### Login Screen

* Username validation
* Login button
* Dark mode toggle

### Directory Dashboard

* Directory List

* Search functionality
  (real-time filtering,
  dynamic update)

* Users can search
  stored messages
  inside selected
  directories.

* Add new directory
  button

* Responsive layout

### File Upload

* Users can attach files
* Select file
* Store reference
* Display uploaded
  item

### Dark Mode

The application includes theme switching

* Light mode
* Dark Mode
* Better accessibility
* Improved visual experience

---

## How to run the project:

Open terminal on Visual studio

```bash
npx expo start --clear
```

Open Android Studio

```plaintext
Device manager
→ start device
```

inside terminal

```plaintext
(a)
```

Application opens on android emulator.

---

## Testing

Testing was completed using

* Android Emulator (Pixel 9 API 37)
* Expo Go
* Web Preview

✓ Login

✓ Directory opens

✓ File upload works

✓ Dark mode works

✓ Deleting messages works

---

## Challenges | Solutions

| Challenges                      | Solutions              |
| ------------------------------- | ---------------------- |
| Expo Go cache issues            | Cleared Expo cache     |
| Emulator connection problems    | Installed dependencies |
| Package dependency installation |                        |
| TypeScript configuration errors | Updated tsconfig.json  |

---

## Future improvements

There are several improvements in the future to make it more useful and user friendly. Features such as user accounts and secure login could be added so users can save and access their 
messages from different devices. Could storage support would make messages backup and synchronization easier. The application could also include real rime message updates, 
notification, profile customization and better file management options. Improving the search feature with updates would focus on improving performance, adding more functionality and 
creating a more polished mobile experience.

---

## Conclusion

The message directory application successfully demonstrates mobile application development using React Native and Expo. The project implements directory organization, responsive design, 
message handling, file upload and theme switching while maintaining compatibility with Android Emulator. 
