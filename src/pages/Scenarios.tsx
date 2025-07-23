import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Zap, Eye} from 'lucide-react';
import { useSelfHeal } from '../contexts/SelfHealContext';
import SelfHealBanner from '../components/SelfHealBanner';
import HealingInfo from '../components/HealingInfo';
import { Card }   from '../components/ui/card';
import ProgressBar from '../components/ui/ProgressBar';
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Scenarios: React.FC = () => {
  const { isHealing } = useSelfHeal();
  const [toggleState, setToggleState] = useState(false);
  const [progressValue, setProgressValue] = useState(45);
  const getElementId = (base: string, scenario: string) => {
    if (isHealing) {
      const idMaps: { [key: string]: { [key: string]: string } } = {
        form: {
          'email-input': 'user-email-field',
          'password-input': 'user-pass-field',
          'submit-btn': 'form-submit-button'
        },
        login: {
          'login-email': 'auth-email-input',
          'login-password': 'auth-password-input',
          'login-submit': 'authenticate-button'
        },
        toggle: {
          'feature-toggle': 'option-switch',
          'toggle-label': 'switch-description'
        },
        progress: {
          'progress-status-id': 'indicator-status-id',
        }
      };
      return idMaps[scenario]?.[base] || base;
    }
    return base;
  };

  const scenarios = [
    {
      id: 'id-change',
      title: 'ID Attribute Change',
      description: 'Element IDs change dynamically to simulate locator drift.',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      id: 'xpath-change',
      title: 'Xpath Change',
      description: 'Element XPaths are updated to reflect DOM structure changes.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'content-desc-change',
      title: 'Content Description Change',
      description: 'Content descriptions (aria-label, title, etc.) are modified.',
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 'text-change',
      title: 'Element Text Change',
      description: 'Element visible text is changed to simulate UI updates.',
      icon: <Eye className="w-6 h-6" />
    },
    {
      id: 'toggle',
      title: 'Toggle Button',
      description: 'Interactive switches and button states',
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'progress',
      title: 'Progress Indicators',
      description: 'Dynamic progress bars and status elements',
      icon: <AlertTriangle className="w-6 h-6" />
    }
  ];

  // Custom toast styles based on healing mode
  const toastStyles = `border-2 shadow-lg rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${isHealing ? 'bg-orange-100 border-orange-300 text-orange-800' : 'bg-blue-100 border-blue-300 text-blue-800'}`;

  return (
    <div className="min-h-screen py-8">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Self-Healing Test Scenarios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive examples showing how self-healing works with different UI elements. 
            Toggle the self-heal mode above to see locator changes in action.
          </p>
          {isHealing && (
            <div className="mt-4 flex justify-center">
              <SelfHealBanner />
            </div>
          )}
        </div>

        {/* Scenarios Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ID Attribute Change Scenario */}
          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ID Attribute Change</h3>
                <p className="text-gray-600">Element IDs change dynamically to simulate locator drift.</p>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                id={isHealing ? 'dynamic-id-field' : 'static-id-field'}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all ${isHealing ? 'border-orange-300 focus:ring-orange-500 bg-orange-50' : 'border-gray-300 focus:ring-blue-500'}`}
                placeholder={isHealing ? 'Dynamic ID Field' : 'Static ID Field'}
              />
              {isHealing && (
                <HealingInfo
                  message="ID changed from 'static-id-field' → 'dynamic-id-field'."
                  details="Self-healing automatically adapts to new IDs, so your tests keep working even if the attribute changes."
                />
              )}
            </div>
          </Card>
          
          {/* Xpath Change Scenario */}
          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Xpath Change</h3>
                <p className="text-gray-600">Element XPaths are updated to reflect DOM structure changes.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Current Xpath:</span>
                <span
                  className={`font-mono px-2 py-1 rounded break-all whitespace-pre-wrap ${isHealing ? 'bg-orange-50 text-orange-700' : 'bg-gray-100 text-gray-700'}`}
                  style={{ wordBreak: 'break-all', maxWidth: '100%' }}
                >
                  {isHealing
                    ? "//div[@id='xpath-form']/section/input"
                    : "//div[@id='xpath-form']/input"}
                </span>
              </div>
              {/* Render input in different DOM structure based on self-heal mode */}
              {!isHealing ? (
                <div id="xpath-form">
                  <input type="text" id="xpath-input" className="w-full px-4 py-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-blue-500" placeholder="Normal XPath Input" />
                </div>
              ) : (
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <div className="w-1/2">
                      <div className="bg-orange-100 p-2 rounded shadow">
                        <span className="text-xs text-orange-700">Extra Wrapper</span>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="bg-orange-100 p-2 rounded shadow">
                        <span className="text-xs text-orange-700">Another Wrapper</span>
                      </div>
                    </div>
                  </div>
                  <div id="xpath-form" className="bg-orange-100 rounded-lg p-2 flex flex-col gap-2">
                    <section className="flex flex-col gap-2">
                      <input type="text" id="xpath-input-heal" className="w-full px-4 py-3 border-2 border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-500 bg-orange-50 font-bold" placeholder="Heal-Mode XPath Input" />
                    </section>
                  </div>
                </div>
              )}
              {isHealing && (
                <HealingInfo
                  message="Xpath changed to reflect DOM updates."
                  details="Self-healing finds the element even if its position or structure changes in the DOM."
                />
              )}
            </div>
          </Card>

          {/* Content Description Change Scenario */}
          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Content Description Change</h3>
                <p className="text-gray-600">Content descriptions (title, aria-label, etc.) are modified.</p>
              </div>
            </div>
            <div className="space-y-4">
              <button
                title={isHealing ? 'Primary Action' : 'Submit'}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${isHealing ? 'bg-orange-600 hover:bg-orange-700 text-white ring-2 ring-orange-300' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                onClick={() => toast({
                  title: isHealing ? 'Self-Heal Demo' : 'Normal Demo',
                  description: 'Content Description button clicked!',
                  className: toastStyles,
                  duration: 200 // 0.2 second
                })}
              >
                {isHealing ? 'Primary Action' : 'Submit'}
              </button>
              {isHealing && (
                <HealingInfo
                  message="title changed from 'Submit' → 'Primary Action'."
                  details="Self-healing adapts to changes in accessibility attributes, so your tests remain robust."
                />
              )}
            </div>
          </Card>

          {/* Element Text Change Scenario */}
          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Element Text Change</h3>
                <p className="text-gray-600">Element visible text is changed to simulate UI updates.</p>
              </div>
            </div>
            <div className="space-y-4">
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${isHealing ? 'bg-orange-600 hover:bg-orange-700 text-white ring-2 ring-orange-300' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                onClick={() => toast({
                  title: isHealing ? 'Self-Heal Demo' : 'Normal Demo',
                  description: 'Element Text Change button clicked!',
                  className: toastStyles,
                  duration: 200 // 0.2 second
                })}
              >
                {isHealing ? 'Proceed' : 'Continue'}
              </button>
              {isHealing && (
                <HealingInfo
                  message="Button text changed from 'Continue' → 'Proceed'."
                  details="Self-healing matches elements even if their visible text changes, so your tests don't break on UI updates."
                />
              )}
            </div>
          </Card>

          {/* Toggle Button Scenario */}
          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Toggle Button</h3>
                <p className="text-gray-600">Interactive switches and states</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label 
                    htmlFor={getElementId('feature-toggle', 'toggle')}
                    id={getElementId('toggle-label', 'toggle')}
                    className="text-sm font-medium text-gray-700"
                  >
                    Enable Feature
                  </label>
                  <p className="text-xs text-gray-500">Toggle this feature on/off</p>
                </div>
                <button
                  onClick={() => setToggleState(!toggleState)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${getElementId('feature-toggle', 'toggle')} ${
                    toggleState 
                      ? (isHealing ? 'bg-orange-600' : 'bg-blue-600')
                      : 'bg-gray-200'
                  } ${isHealing ? 'ring-2 ring-orange-300' : ''}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      toggleState ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {isHealing && (
              <HealingInfo
                message="Toggle className changed from 'feature-toggle' → 'option-switch'"
                details="Self-healing adapts to changes in toggle element identifiers (ID, class, or attribute), so your tests remain robust even if switches are refactored."
              />
            )}
          </Card>
          
          {/* Progress Bar Scenario */}
          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Progress Indicators</h3>
                <p className="text-gray-600">Dynamic progress and status elements</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span 
                    className="text-sm font-medium text-gray-700"
                    id={getElementId('progress-text', 'progress')}
                  >
                    Upload Progress
                  </span>
                  <span className="text-sm text-gray-500">{progressValue}%</span>
                </div>
                <ProgressBar 
                  value={progressValue} 
                  className={isHealing ? 'ring-2 ring-orange-300 rounded-full' : ''}
                />
              </div>

              <div className="flex gap-2 w-full">
                {[25, 50, 75, 100].map((value) => (
                  <button
                    key={value}
                    onClick={() => setProgressValue(value)}
                    id={getElementId(`progress-btn-${value}`, 'progress')}
                    className={`flex-1 py-2 px-2 text-sm rounded-lg font-medium transition-all ${
                      isHealing
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 ring-1 ring-orange-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>

              <div className={`p-4 rounded-lg transition-all ${
                progressValue === 100 
                  ? (isHealing ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200')
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                <p 
                id={getElementId('progress-status-id', 'progress')}
                className={`text-sm font-medium ${
                  progressValue === 100 
                    ? (isHealing ? 'text-orange-700' : 'text-green-700')
                    : 'text-gray-700'
                }`}>
                  Status: {progressValue === 100 ? 'Complete' : 'In Progress'}
                </p>
              </div>
            </div>

            {isHealing && (
              <HealingInfo
                message="Progress Status ID changed from 'progress-status-id' to 'indicator-status-id'"
                details="Self-healing adapts to changes in progress bar attributes and structure, so your tests keep tracking status even if UI components change."
              />
            )}
          </Card>
        </div>

        {/* Summary Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How These Scenarios Demonstrate Self-Healing
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Normal Mode</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Elements use standard ID patterns</li>
                <li>• Tests would work with original selectors</li>
                <li>• Predictable element identification</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Self-Healing Mode</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Elements are modified to simulate changes</li>
                <li>• Visual indicators show healing is active</li>
                <li>• Tests would auto-adapt to new selectors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;
