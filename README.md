# 🐎 Horse Racing Game

An interactive horse racing game built with Vue.js 3 (Composition API) and Vuex for state management.

## 🎮 Features

### Horse Generation
- **20 Unique Horses**: Each horse has a unique color, name, and random condition score (1-100)
- **Visual Horse Cards**: Display horse information with condition bars and status indicators
- **Dynamic Horse States**: Horses show racing status during competitions

### Race Schedule
- **6 Rounds**: Each round features 10 randomly selected horses
- **Progressive Distances**: 
  - Round 1: 1200m
  - Round 2: 1400m
  - Round 3: 1600m
  - Round 4: 1800m
  - Round 5: 2000m
  - Round 6: 2200m

### Race Simulation
- **Real-time Animation**: Horses move across the track with smooth animations
- **Condition-based Performance**: Horse speed influenced by condition score and randomness
- **Visual Race Track**: Animated race track with finish line and lane numbers

### Results & Statistics
- **Round-by-round Results**: Complete results for each race
- **Winner Highlights**: Special highlighting for race winners
- **Podium Display**: Top 3 finishers with medals
- **Full Results List**: Complete rankings for all participants

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── Controls.vue      # Game control buttons and status
│   ├── HorseList.vue     # Horse stable display
│   ├── RaceTrack.vue     # Active race visualization
│   └── Results.vue       # Race results and statistics
├── store/
│   ├── index.js          # Main store configuration
│   └── modules/
│       ├── horses.js     # Horse data management
│       ├── race.js       # Race logic and simulation
│       └── game.js       # Game state and controls
└── App.vue               # Main application component
```

### State Management
- **Vuex Store**: Centralized state management with modular structure
- **Horses Module**: Manages horse generation and data
- **Race Module**: Handles race scheduling, simulation, and results
- **Game Module**: Controls overall game flow and UI states

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd horse-racing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎯 How to Play

1. **Initialize**: Horses are automatically generated when the game loads
2. **Generate Schedule**: Click "Generate Race Schedule" to create 6 rounds
3. **Start Racing**: Click "Start Race" to begin the competition
4. **Watch Races**: Observe horses racing across the track with real-time animations
5. **View Results**: Check the results panel for race outcomes and statistics
6. **Reset**: Use "Reset Game" to start over

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

## 🎨 Customization

### Horse Colors
Modify the color array in `src/store/modules/horses.js` to change horse colors.

### Race Distances
Adjust the distances array in `src/store/modules/race.js` to modify race lengths.

### Animation Speed
Update the `raceDuration` and `updateInterval` values in the race simulation for different animation speeds.

## 🔧 Technical Details

### Race Logic
- Horses move based on their condition score (1-100)
- Random factor adds unpredictability to races
- Position updates every 100ms during 5-second races
- Final positions determine race rankings

### Performance
- Optimized animations using CSS transitions
- Efficient state updates with Vuex
- Responsive design for various screen sizes

### Browser Support
- Modern browsers with ES6+ support
- CSS Grid and Flexbox for layout
- CSS animations and transitions

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

Layout automatically adjusts based on screen size with optimized mobile experience.

## 🎉 Future Enhancements

Potential features for future versions:
- Sound effects and music
- Betting system
- Horse breeding mechanics
- Tournament modes
- Leaderboards
- Multiplayer support

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues, please open an issue on the GitHub repository. 