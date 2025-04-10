# Timesheet App

A simple clock-in / clock-out timesheet app built with **React Native (Expo)** for a small business. Designed for shared use on a single device without requiring logins.

## 📱 Features

- ⏱️ Employees can clock in and out with a single tap
- 👀 Each employee can view only their own timesheet
- 🧑‍🔧 Owner view to see all employees' timesheets
- 🧹 Auto-deletes records older than 3 months
- 🗑️ Owner can delete all timesheet records manually
- 💾 Uses local SQLite database (offline only)
- 📆 Time is displayed in readable `dd-mm-yyyy HH:mm:ss` format
- ⚙️ No PIN or login — designed for simple in-shop usage
- 🌐 Local only — data stored on device, not in the cloud

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)

## 🚀 Getting Started

```bash
git clone https://github.com/sh-13/timesheet.git
cd timesheet
npm install
npx expo start