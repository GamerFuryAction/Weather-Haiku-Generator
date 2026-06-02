# 🌤️ Weather-Haiku-Generator

<p align="center">
  <img src="https://raw.githubusercontent.com/GamerFuryAction/Weather-Haiku-Generator/main/thumbnail.png" alt="Weather Haiku Generator Banner" width="100%">
</p>

A minimalist web application that bridges live meteorological data with poetic expression. Every visit captures your local weather conditions via a free API and dynamically translates them into a completely unique, context-aware haiku matching the mood of the sky.

---

## 🎨 Visual Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/GamerFuryAction/Weather-Haiku-Generator/main/Screenshot_20260526_135236.png" alt="Weather Haiku Generator Banner" width="100%">
</p>

*From sunny morning lightheartedness to stormy, melancholic midnight reflections—the app captures the literal atmosphere and converts it to poetry.*

---

## ✨ Features

- **Real-Time Weather Integration:** Fetches live atmospheric details (temperature, condition tags, wind speed, and cloud cover) using a lightweight open API.
- **Dynamic Mood Mapping:** Translates standard data structures into distinct poetic weights:
  - ☀️ **Clear/Sunny:** Bright, energetic vocabulary with lighthearted, optimistic prose.
  - 🌧️ **Rain/Storm:** Slower pacing, cozy or somber cadences, and melancholic imagery.
  - ☁️ **Overcast/Fog:** Introspective, quiet, and mysterious themes.
  - ❄️ **Snow:** Crisp, silent, and pristine motifs.
- **Strict Syllable Validation:** Leverages a deterministic dictionary-mapped matrix to guarantee perfect **5-7-5** haiku structures every single generation.
- **Privacy-First Geolocation:** Attempts native browser location lookup with an instantaneous city-search fallback for users with strict privacy settings.

---

## 🛠️ Architecture & Technical Pivot

### The Syllable Counting Trap 🐰
During early development, a significant amount of time was spent trying to implement a programmatic regex-based English syllable counter on the client-side. Due to the deep irregularities of English orthography (e.g., parsing silent vowels, diphthongs, and word endings), the runtime validation was either excessively heavy or highly error-prone.

### The Solution
The system was refactored to use a **curated structural vocabulary matrix**. Nouns, verbs, and adjectives are pre-sorted and categorized by both semantic mood index and explicit syllable weight. The generation engine algorithmically weaves these components together based on the active API weather parameters, guaranteeing flawless literary structure without execution overhead.

---

## ⚙️ Quick Start

### Prerequisites
- Modern Web Browser (Chrome, Firefox, Safari, Edge)
- An API Key from a free weather provider (e.g., OpenWeatherMap)

### You can view it [here](https://gamerfuryaction.github.io/Weather-Haiku-Generator).
