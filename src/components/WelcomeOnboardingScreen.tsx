import React, { useState } from 'react';
import { Check, ChevronRight, Coins, Shield, Trophy, User, Users } from 'lucide-react';
import { FootballPlayer, PLAYERS_DB, TeamData, TEAMS_DB } from '../data/gameDatabase';
import { SoundEngine } from '../engine/SoundEngine';
import heroStadiumImg from '../assets/images/hero_stadium_backdrop_1791305638088.jpg';

interface WelcomeOnboardingScreenProps {
  initialUsername: string;
  initialEmail?: string;
  initialClub: TeamData;
  starterSquad: FootballPlayer[];
  coins: number;
  isGoogleLinked?: boolean;
  onOpenGoogleAuth?: () => void;
  onCompleteOnboarding: (username: string, favouriteClub: TeamData, email?: string) => void;
}

export const WelcomeOnboardingScreen: React.FC<WelcomeOnboardingScreenProps> = ({
  initialUsername,
  initialEmail = '',
  initialClub,
  starterSquad,
  coins,
  isGoogleLinked,
  onOpenGoogleAuth,
  onCompleteOnboarding,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [username, setUsername] = useState(initialUsername);
  const [selectedClub, setSelectedClub] = useState<TeamData>(initialClub);
  const [categoryTab, setCategoryTab] = useState<'Club' | 'International'>('Club');
  const [errorMsg, setErrorMsg] = useState('');

  const displayedTeams = TEAMS_DB.filter((t) => t.category === categoryTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmed = username.trim();
    if (trimmedEmail && !trimmedEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address (or leave blank to continue as guest).');
      return;
    }
    if (!trimmed) {
      setErrorMsg('Please enter your Username before starting the game.');
      return;
    }
    SoundEngine.playUIClick();
    onCompleteOnboarding(trimmed, selectedClub, trimmedEmail || undefined);
  };

  return (
    <div className="min-h-screen bg-[#070A0E] text-[#F1F5F9] relative flex flex-col justify-between overflow-x-hidden">
      {/* Stadium Background with Scrim */}
      <img
        src={heroStadiumImg}
        alt="Football Elite Stadium"
        referrerPolicy="no-referrer"
        className="fixed inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#070A0E]/90 via-[#070A0E]/85 to-[#070A0E] pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
        <div className="font-display text-xl font-bold tracking-tight text-white">
          FOOTBALL ELITE: WORLD OF CHAMPIONS
        </div>
        <div className="flex items-center gap-3">
          {onOpenGoogleAuth && (
            <button
              type="button"
              onClick={onOpenGoogleAuth}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-[#070A0E] font-display font-bold text-xs rounded-xl flex items-center gap-2 shadow cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-[#070A0E] text-white flex items-center justify-center text-[10px] font-bold">
                G
              </span>
              {isGoogleLinked ? 'Signed In (Permanent Save ✓)' : 'Email Sign-In'}
            </button>
          )}
          <div className="flex items-center gap-2 font-mono text-xs text-[#F59E0B] font-bold">
            <Coins className="w-4 h-4" />
            STARTING BUDGET: {coins.toLocaleString()} COINS
          </div>
        </div>
      </header>

      {/* Main Onboarding Form */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-6 py-8 my-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Email Sign-In & Username Input Banner */}
          <div className="bg-[#111722]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-2">
                <div className="text-xs font-mono text-[#10B981] tracking-widest">
                  STEP 1 OF 2 · EMAIL SIGN-IN & PERMANENT CLOUD SAVE
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  SIGN IN & SAVE PROGRESS
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Enter any email address to stay logged in permanently after your first sign-in. Your money, purchased players, 50-Star Roulette rewards, Dream Team, and progress are saved forever.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      EMAIL ADDRESS (BLANK — ENTER ANY EMAIL)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="Enter any email address..."
                      autoComplete="email"
                      className="w-full bg-[#070A0E] border-2 border-[#10B981]/60 focus:border-[#10B981] rounded-xl px-4 py-3 font-sans text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      PLAYER USERNAME
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#10B981] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        placeholder="Enter your football username..."
                        maxLength={24}
                        className="w-full bg-[#070A0E] border-2 border-[#10B981]/60 focus:border-[#10B981] rounded-xl pl-11 pr-4 py-3 font-display text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 bg-[#10B981] hover:bg-[#059669] text-[#070A0E] font-display font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg cursor-pointer"
                  >
                    SIGN IN, SAVE & START GAME
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                {errorMsg && <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>}
              </div>
            </div>
          </div>

          {/* Step 2: Choose Favourite Real-World Football Club + Starter World Cup Squad Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Real-World Football Clubs Selection Menu */}
            <div className="lg:col-span-8 bg-[#111722]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-5">
                <div>
                  <div className="text-xs font-mono text-[#F59E0B]">
                    STEP 2 OF 2 · CHOOSE YOUR FAVOURITE CLUB
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    SELECT YOUR FAVOURITE FOOTBALL CLUB
                  </h2>
                </div>

                <div className="flex items-center gap-1 p-1 bg-[#070A0E] border border-white/10 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      SoundEngine.playUIClick();
                      setCategoryTab('Club');
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                      categoryTab === 'Club'
                        ? 'bg-[#10B981] text-[#070A0E] font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Real-World Clubs (17)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      SoundEngine.playUIClick();
                      setCategoryTab('International');
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                      categoryTab === 'International'
                        ? 'bg-[#F59E0B] text-[#070A0E] font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    World Cup Nations (16)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {displayedTeams.map((club) => {
                  const isSelected = selectedClub.id === club.id;
                  return (
                    <button
                      type="button"
                      key={club.id}
                      onClick={() => {
                        SoundEngine.playUIClick();
                        setSelectedClub(club);
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#192231] border-[#10B981] ring-2 ring-[#10B981]/40'
                          : 'bg-[#070A0E]/80 border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-4 h-4 rounded-sm border border-white/20 inline-block"
                            style={{ backgroundColor: club.primaryColor }}
                          />
                          <span
                            className="w-2.5 h-4 rounded-sm border border-white/20 inline-block"
                            style={{ backgroundColor: club.secondaryColor }}
                          />
                        </div>
                        <span className="font-mono text-xs text-[#F59E0B] font-bold">
                          OVR {club.rating}
                        </span>
                      </div>

                      <div>
                        <div className="font-display font-bold text-sm text-white truncate">
                          {club.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {club.leagueOrRegion || club.confederation}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 4 Cols: Initial Active World Cup Squad & Unlockable Superstars Preview */}
            <div className="lg:col-span-4 bg-[#111722]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <div className="text-xs font-mono text-[#38BDF8]">
                    INITIAL WORLD CUP SQUAD
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Your Starting World Cup Players
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    You start with 12 active World Cup stars and can unlock legends with in-game Coins.
                  </p>
                </div>

                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {starterSquad.slice(0, 6).map((p) => (
                    <div
                      key={p.id}
                      className="px-3 py-2 rounded-lg bg-[#070A0E] border border-white/10 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-mono text-[#10B981] font-bold mr-2">
                          {p.position}
                        </span>
                        <span className="font-display font-bold text-white">{p.name}</span>
                        <span className="text-slate-400 text-[11px] ml-1.5">({p.nationality})</span>
                      </div>
                      <span className="font-mono font-bold text-[#F59E0B]">{p.rating}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10">
                  <div className="text-xs font-mono text-[#F59E0B] font-bold mb-2">
                    UNLOCKABLE WITH IN-GAME MONEY:
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-300">
                    {PLAYERS_DB.filter((p) => !p.initialUnlocked)
                      .slice(0, 6)
                      .map((star) => (
                        <span
                          key={star.id}
                          className="px-2 py-1 bg-[#070A0E] border border-[#F59E0B]/30 rounded text-white"
                        >
                          {star.name} ({star.rating})
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-5 py-3.5 bg-[#10B981] hover:bg-[#059669] text-[#070A0E] font-display font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                ENTER STADIUM AS {username.trim().toUpperCase() || 'PLAYER'} ({selectedClub.shortName})
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
