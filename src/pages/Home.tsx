import React from 'react';
import { ArrowRight, Shield, Zap, CheckCircle, AlertTriangle, Code, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelfHeal } from '../contexts/SelfHealContext';
import { useUser } from '../contexts/UserContext';

const Home: React.FC = () => {
  const { isHealing } = useSelfHeal();
  const { user } = useUser();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Automatic Recovery',
      description: 'Tests automatically recover from locator changes without manual intervention'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Reduced Flakiness',
      description: 'Significantly reduces test failures due to UI changes and element updates'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Smart Locator Selection',
      description: 'Intelligently selects the best alternative locators when primary ones fail'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Zero Code Changes',
      description: 'Works seamlessly with existing test suites without requiring code modifications'
    }
  ];

  const useCases = [
    {
      scenario: 'ID Attribute Changes',
      description: 'When developers change element IDs during development',
      example: 'login-btn → user-login-button'
    },
    {
      scenario: 'XPath Modifications',
      description: 'When DOM structure changes affect XPath selectors',
      example: '//*[@id="form"]/div[1] → //*[@id="form"]/section[1]'
    },
    {
      scenario: 'Content Updates',
      description: 'When button text or labels are modified',
      example: '"Submit" → "Save Changes"'
    },
    {
      scenario: 'Element Restructuring',
      description: 'When UI components are reorganized or refactored',
      example: 'Class name changes, nested structure updates'
    }
  ];

  const getElementId = (base: string) => {
    // if (isHealing) {
    //   const idMap: { [key: string]: string } = {
    //     'hero-title': 'main-page-heading',
    //     'hero-subtitle': 'page-description-text',
    //     'cta-button': 'primary-action-button',
    //     'features-section': 'benefits-container'
    //   };
    //   return idMap[base] || base;
    // }
    return base;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              id={getElementId('hero-title')}
            >
              BrowserStack Self-Healing Demo
            </h1>
            <p 
              className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto"
              id={getElementId('hero-subtitle')}
            >
              Automatically recover from locator changes and reduce test flakiness with 
              intelligent self-healing technology that adapts to UI changes in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/scenarios"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                id={getElementId('cta-button')}
              >
                Try Demo Scenarios
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Self-Healing Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI algorithms detect locator failures and automatically find alternative element selectors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Detect Failure</h3>
              <p className="text-gray-600">Test detects that primary locator is no longer valid</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Find Alternative</h3>
              <p className="text-gray-600">AI searches for alternative locators using multiple strategies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Auto-Heal</h3>
              <p className="text-gray-600">Test continues execution with new locator seamlessly</p>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-gray-900 text-white p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Enable Self-Healing in Your Tests</h3>
            <div className="relative">
              <pre className="text-sm overflow-x-auto" id="selfheal-java-example">
                <code>{`// Java Selenium Example with BrowserStack Self-Heal
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import java.net.URL;
import java.util.HashMap;

public class SelfHealDemo {
    public static void main(String[] args) throws Exception {
        MutableCapabilities capabilities = new MutableCapabilities();
        HashMap<String, Object> browserstackOptions = new HashMap<>();
        browserstackOptions.put("userName", "YOUR_USERNAME");
        browserstackOptions.put("accessKey", "YOUR_ACCESS_KEY");
        browserstackOptions.put("selfHeal", true); // Enable self-heal
        capabilities.setCapability("bstack:options", browserstackOptions);
        capabilities.setCapability("browserName", "Chrome");
        capabilities.setCapability("browserVersion", "latest");

        RemoteWebDriver driver = new RemoteWebDriver(
            new URL("https://hub.browserstack.com/wd/hub"), capabilities
        );

        // Your test steps go here
        driver.get("https://www.example.com");
        // ...
        driver.quit();
    }
}
`}</code>
              </pre>
              <button
                type="button"
                className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-semibold"
                onClick={() => {
                  const code = document.getElementById('selfheal-java-example')?.innerText;
                  if (code) {
                    navigator.clipboard.writeText(code);
                  }
                }}
                aria-label="Copy code"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-20 bg-gray-50"
        id={getElementId('features-section')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Improve test reliability and reduce maintenance overhead
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center"
                id={isHealing ? `feature-card-${index + 1}` : `feature-${index}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Self-Healing Scenarios
            </h2>
            <p className="text-xl text-gray-600">
              Real-world situations where self-healing saves your tests
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {useCase.scenario}
                </h3>
                <p className="text-gray-700 mb-4">
                  {useCase.description}
                </p>
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-600 font-mono">
                    {useCase.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Self-Healing?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Toggle the self-heal mode above and explore our interactive scenarios
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/scenarios"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Try Interactive Demo
            </Link>
            <button
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              onClick={() => {
                if (user) {
                  navigate('/products');
                } else {
                  navigate('/login');
                }
              }}
            >
              Start Testing
            </button>
          </div>
        </div>
      </section>

      {/* Info/Warning Section for Self-Heal Mode */}
      <section className="py-8 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 text-yellow-700">
            <AlertTriangle className="w-6 h-6" />
            <span className="font-semibold">Important Info</span>
          </div>
          <p className="text-yellow-800 mb-2">
            <strong>Self-Heal mode in this demo does <u>not</u> actually heal elements or run real tests.</strong> It only illustrates how locator changes are detected and handled for educational purposes.
          </p>
          <p className="text-yellow-800 mb-2">
            To use BrowserStack's AI-powered self-healing in your own tests, you must set the <code className="bg-yellow-100 px-2 py-1 rounded">selfHeal: true</code> capability in your test configuration. The feature works only when your test script is executed on BrowserStack Platform with self-heal enabled.
          </p>
          {/* <p className="text-yellow-800 mb-2">
            Self-heal does not recover from all error types (e.g., WebDriver or system-level failures), and may slightly impact test execution time. Always review your test logs to understand why healing was required.
          </p> */}
          <p className="text-yellow-800 mb-2">
            For full details, limitations, and best practices, refer to the official documentation below.
          </p>
          <a
            href="https://www.browserstack.com/docs/automate/selenium/self-healing?fw-lang=java#BrowserStack_SDK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors"
          >
            Learn More in Official Docs
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
