
import React, { useState } from 'react';
import { ViewState, DebateConfig } from './arena/types';
import { ArenaLobby } from './arena/ArenaLobby';
import { ArenaCreate } from './arena/ArenaCreate';
import { ArenaLive } from './arena/ArenaLive';
import { ArenaHistory } from './arena/ArenaHistory';

export const CloneArenaTab: React.FC = () => {
    const [view, setView] = useState<ViewState>('lobby');
    const [debateConfig, setDebateConfig] = useState<DebateConfig | null>(null);

    const handleStartDebate = (config: DebateConfig) => {
        setDebateConfig(config);
        setView('live');
    };

    const handleExit = () => {
        setView('lobby');
        setDebateConfig(null);
    };

    return (
        <div className="w-full">
            {view === 'lobby' && (
                <ArenaLobby 
                    onCreateClick={() => setView('create')} 
                    onHistoryClick={() => setView('history')}
                />
            )}
            {view === 'create' && (
                <ArenaCreate 
                    onBack={() => setView('lobby')} 
                    onStart={handleStartDebate} 
                />
            )}
            {view === 'live' && debateConfig && (
                <ArenaLive 
                    config={debateConfig} 
                    onExit={handleExit} 
                />
            )}
             {view === 'history' && (
                <ArenaHistory 
                    onBack={() => setView('lobby')} 
                />
            )}
        </div>
    );
};
