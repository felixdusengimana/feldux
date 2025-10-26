'use client';

import { useState } from 'react';
import { Root, Input, Label } from '@frjoy/otp';

interface PlaygroundConfig {
    type: 'number' | 'text' | 'any';
    password: boolean;
    joiner: string;
    pattern: string;
    inputCount: number;
    inputLength: number;
    className: string;
}

const inititalConfig: PlaygroundConfig = {
    type: 'number',
    password: false,
    joiner: '',
    pattern: '',
    inputCount: 6,
    inputLength: 1,
    className: "min-w-12 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
};

export default function OTPPlayground() {
    const [playgroundOtp, setPlaygroundOtp] = useState('');
    const [playgroundConfig, setPlaygroundConfig] = useState<PlaygroundConfig>(inititalConfig);

    const resetToDefault = () => {
        setPlaygroundOtp('');
        setPlaygroundConfig(inititalConfig);
    };

    return (
        <div className="my-10 w-full min-w-0">
            <h2 id="interactive-playground" className="text-2xl font-semibold mb-4">Interactive Playground</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                Experiment with different props and see the changes in real-time.
            </p>

            {/* Preset Configurations */}
            <div className="mb-6 w-full">
                <h3 className="text-lg font-semibold mb-3">Quick Presets</h3>
                <div className="flex flex-wrap gap-2 max-w-full">
                    <button
                        onClick={() => {
                            setPlaygroundOtp('');
                            setPlaygroundConfig({
                                ...inititalConfig,
                                inputCount: 6,
                            });
                        }}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                        SMS OTP (6 digits)
                    </button>
                    <button
                        onClick={() => {
                            setPlaygroundOtp('');
                            setPlaygroundConfig({
                                ...inititalConfig,
                                inputCount: 4,
                            });

                        }} className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                    >
                        PIN Code (4 digits)
                    </button>
                    <button
                        onClick={() => {
                            setPlaygroundOtp('');
                            setPlaygroundConfig({
                                ...inititalConfig,
                                type: 'text',
                                joiner: '-',
                                inputCount: 4,
                                inputLength: 2,
                            });
                        }}
                        className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                    >
                        Referral Code (XX-XX-XX-XX)
                    </button>
                    <button
                        onClick={() => {
                            setPlaygroundOtp('');
                            setPlaygroundConfig({
                                ...inititalConfig,
                                type: 'text',
                                joiner: ' ',
                                pattern: '[A-Z0-9]',
                                inputCount: 3,
                                inputLength: 3,
                            });
                        }}
                        className="px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                    >
                        License Key (XXX XXX XXX)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 w-full min-w-0">
                {/* Controls Panel */}
                <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg min-w-0">
                    <h3 className="text-lg font-semibold mb-4">Configuration</h3>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Type</label>
                        <select
                            value={playgroundConfig.type}
                            onChange={(e) => {
                                setPlaygroundOtp('');
                                setPlaygroundConfig(prev => ({ ...prev, type: e.target.value as 'number' | 'text' | 'any' }))
                            }}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="number">number</option>
                            <option value="text">text</option>
                            <option value="any">any</option>
                        </select>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={playgroundConfig.password}
                                onChange={(e) => {
                                    setPlaygroundOtp('');
                                    setPlaygroundConfig(prev => ({ ...prev, password: e.target.checked }));
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium">Password mode</span>
                        </label>
                    </div>

                    {/* Joiner */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Joiner</label>
                        <input
                            type="text"
                            value={playgroundConfig.joiner}
                            onChange={(e) => {
                                setPlaygroundOtp('');
                                setPlaygroundConfig(prev => ({ ...prev, joiner: e.target.value }));
                            }}
                            placeholder="e.g., -, space, etc."
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Pattern */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Pattern (regex)</label>
                        <input
                            type="text"
                            value={playgroundConfig.pattern}
                            onChange={(e) => {
                                setPlaygroundOtp('');
                                setPlaygroundConfig(prev => ({ ...prev, pattern: e.target.value }));
                            }}
                            placeholder="e.g., [0-9], [A-Z0-9]"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Input Count */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Number of inputs</label>
                        <input
                            type="number"
                            min="2"
                            max="12"
                            value={playgroundConfig.inputCount}
                            onChange={(e) => {
                                setPlaygroundOtp('');
                                setPlaygroundConfig(prev => ({ ...prev, inputCount: parseInt(e.target.value) || 2 }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Input Length */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Characters per input</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={playgroundConfig.inputLength}
                            onChange={(e) => {
                                setPlaygroundOtp('');
                                setPlaygroundConfig(prev => ({ ...prev, inputLength: parseInt(e.target.value) || 1 }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={resetToDefault}
                        className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Reset to Default
                    </button>
                </div>

                {/* Live Preview */}
                <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg min-w-0 overflow-hidden">
                    <h3 className="text-lg font-semibold mb-4">Live Preview</h3>

                    <Root
                        key={`${playgroundConfig.type}-${playgroundConfig.inputCount}-${playgroundConfig.inputLength}-${playgroundConfig.password}`}
                        onChange={setPlaygroundOtp}
                        type={playgroundConfig.type}
                        password={playgroundConfig.password}
                        joiner={playgroundConfig.joiner || undefined}
                        pattern={playgroundConfig.pattern || undefined}
                    >
                        <Label className="block mb-3 font-medium">Enter Code</Label>
                        <div className='flex gap-1'>
                            {[...Array(playgroundConfig.inputCount)].map((_, i) => (
                                <Input
                                    key={`${playgroundConfig.inputCount}-${playgroundConfig.inputLength}-${i}`}
                                    length={playgroundConfig.inputLength}
                                    className={playgroundConfig.className}
                                />
                            ))}
                        </div>
                    </Root>

                    <div className="my-2 text-sm">
                        <div className="text-gray-700 dark:text-gray-300">
                            <strong>Output:</strong>
                            <div className="font-mono bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded mt-1 break-all overflow-hidden">
                                {playgroundOtp || 'No input yet'}
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Length:</strong> {playgroundOtp.length} characters
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Expected total:</strong> {playgroundConfig.inputCount * playgroundConfig.inputLength + (playgroundConfig.joiner ? (playgroundConfig.inputCount - 1) * playgroundConfig.joiner.length : 0)} characters
                        </p>
                        {playgroundConfig.pattern && (
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Pattern:</strong> <span className="font-mono break-all">{playgroundConfig.pattern}</span>
                            </p>
                        )}
                    </div>

                    {/* Features showcase */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <h4 className="font-medium mb-2">Try these features:</h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Paste complete codes - they'll auto-fill</li>
                            <li>• Use arrow keys to navigate between inputs</li>
                            <li>• Backspace deletes and moves to previous input</li>
                            <li>• Enter moves to next input field</li>
                            {playgroundConfig.password && <li>• Content is masked for security</li>}
                            {playgroundConfig.joiner && <li>• Joiner automatically added in output</li>}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Generated Code */}
            <div className="mb-10 w-full min-w-0">
                <h3 className="text-lg font-semibold mb-3">Generated Code</h3>
                <pre className="bg-gray-100 dark:bg-gray-900 text-sm p-4 rounded overflow-x-auto text-gray-800 dark:text-gray-100 max-w-full">
                    <code>
                        {`<Root 
  onChange={setOtp}${playgroundConfig.type !== 'number' ? `\n  type="${playgroundConfig.type}"` : ''}${playgroundConfig.password ? '\n  password' : ''}${playgroundConfig.joiner ? `\n  joiner="${playgroundConfig.joiner}"` : ''}${playgroundConfig.pattern ? `\n  pattern="${playgroundConfig.pattern}"` : ''}
>
  <Label>Enter Code</Label>
  <div className="flex gap-1">
    {[...Array(${playgroundConfig.inputCount})].map((_, i) => (
      <Input
        key={i}
        length={${playgroundConfig.inputLength}}
        className={"${playgroundConfig.className}"
      />
    ))}
  </div>
</Root>`}
                    </code>
                </pre>
            </div>
        </div>
    );
}