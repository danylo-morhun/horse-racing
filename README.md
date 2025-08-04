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
- **Simplified Winner Display**: Clean, focused winner cards for each round
- **Complete Results Dialog**: Detailed table view with all race statistics
- **Performance Tracking**: Win counts, race participation, and average times
- **Game Completion**: Special completion screen with results access

### Enhanced User Experience
- **Skip Functionality**: Skip current round or entire game to end
- **Professional UI**: Modern design with gradients, shadows, and smooth animations
- **Icon Tooltips**: Compact icon buttons with hover tooltips for better UX
- **Dialog System**: Modal dialogs for detailed information views
- **Responsive Layout**: Optimized for all screen sizes

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── Controls.vue           # Game control buttons and status
│   ├── HorseList.vue          # Horse stable display
│   ├── RaceTrack.vue          # Active race visualization
│   ├── Results.vue            # Race results and statistics
│   ├── Dialog.vue             # Reusable modal dialog component
│   ├── RaceResultsDialog.vue  # Complete race results table
│   ├── HorseStableDialog.vue  # Detailed horse data table
│   └── GameRulesDialog.vue    # Game rules and instructions
├── store/
│   ├── index.js               # Main store configuration
│   └── modules/
│       ├── horses.js          # Horse data management
│       ├── race.js            # Race logic and simulation
│       └── game.js            # Game state and controls
├── utils/
│   └── raceLogic.js           # Pure utility functions for race simulation
└── App.vue                    # Main application component
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
5. **Skip Options**: Use "Skip Round" to fast-forward current race or "Skip to End" to complete all remaining rounds
6. **View Results**: Check the results panel for race outcomes and statistics
7. **Access Details**: Click icon buttons to view complete results, horse data, or game rules
8. **Game Complete**: After all 6 rounds, view complete results or start a new game
9. **Reset**: Use "Reset Game" to start over

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

### UI Styling
- Modify CSS variables in `src/style.css` for consistent theming
- Update gradient colors in component styles for different visual themes
- Adjust animation durations in component transition properties

## 🔧 Technical Details

### Race Logic
- Horses move based on their condition score (1-100)
- Random factor adds unpredictability to races
- Position updates every 100ms during race simulation
- Final positions and finish times determine race rankings
- Skip functionality allows immediate completion of races

### Performance
- Optimized animations using CSS transitions and transforms
- Efficient state updates with Vuex modular store
- Responsive design for various screen sizes
- Pure utility functions for race simulation logic
- Teleport-based modal dialogs for better performance

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



 # Horse Racing Game - Live Demo
# Trigger new deployment
