import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import { skipService } from '../../services/skipService';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-red-600 mb-4">Something went wrong</h2>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const SkipSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const postcode = "NR32";
  const area = "Lowestoft";

  const progressSteps = [
    { label: 'Postcode' },
    { label: 'Waste Type' },
    { label: 'Select Skip' },
    { label: 'Permit Check' },
    { label: 'Choose Date' },
    { label: 'Payment' }
  ];

  const CURRENT_STEP = 3;

  const fetchSkips = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await skipService.getSkipsByLocation(postcode, area);
      setSkips(data);
    } catch (err) {
      console.error('Error fetching skips:', err);
      setError(err.message || 'Failed to fetch skips. Please try again later.');
      setSkips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkips();
  }, [postcode, area]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      navigate('/permit-check', { 
        state: { 
          skip: selectedSkip,
          postcode,
          area
        } 
      });
    } else {
      alert('Please select a skip before continuing');
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white font-poppins pb-[72px] md:pb-0 relative">
        <div className="max-w-7xl mx-auto px-4 py-8 relative z-0">
          <div className="hidden md:block">
            <div className="mb-16">
              <ProgressBar steps={progressSteps} currentStep={CURRENT_STEP} />
            </div>

            <div className="text-center mb-16">
              <h2 className="text-[32px] font-medium leading-10 text-[#242524] mb-4">
                Choose the <span className="font-bold text-[#254d70]">Perfect Skip</span> for Your Project
              </h2>
              <p className="text-xl font-normal leading-[29px] text-[#8c8d8b] max-w-3xl mx-auto">
                Select from our range of skip sizes tailored for different waste types and project scales. 
                {skips.length > 0 && ` All prices include ${skips[0].duration.split(' ')[0]} day hire unless specified.`}
              </p>
            </div>

            <SkipGrid 
              skips={skips} 
              onSelect={setSelectedSkip} 
              selectedSkip={selectedSkip}
              loading={loading}
              error={error}
              onRetry={fetchSkips}
            />
          </div>

          <div className="md:hidden">
            <div className="mb-6">
              <h2 className="text-2xl font-medium leading-8 text-[#242524] mb-2">
                Choose the <span className="font-bold text-[#254d70]">Perfect Skip</span>
              </h2>
              <p className="text-sm text-[#8c8d8b]">
                Step {CURRENT_STEP} of {progressSteps.length}
              </p>
            </div>

            <div className="flex">
              <div className="w-12 relative">
                <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-[#f7f7f7]" />
                {progressSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative ${index + 1 < CURRENT_STEP ? 'opacity-50' : ''} ${
                      index + 1 > CURRENT_STEP ? 'hidden' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        index + 1 <= CURRENT_STEP
                          ? 'bg-[#254d70] text-white'
                          : 'bg-[#f7f7f7] text-[#8c8d8b]'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-1 pl-4">
                {progressSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`mb-6 ${index + 1 < CURRENT_STEP ? 'opacity-50' : ''} ${
                      index + 1 > CURRENT_STEP ? 'hidden' : ''
                    }`}
                  >
                    <div className={`text-sm font-medium ${
                      index + 1 === CURRENT_STEP ? 'text-[#242524]' : 'text-[#8c8d8b]'
                    }`}>
                      {step.label}
                    </div>

                    {index + 1 === CURRENT_STEP && (
                      <div className="mt-4">
                        <p className="text-sm leading-6 text-[#8c8d8b] mb-6">
                          Select from our range of skip sizes tailored for different waste types and project scales. 
                          {skips.length > 0 && ` All prices include ${skips[0].duration.split(' ')[0]} day hire unless specified.`}
                        </p>
                        
                        <SkipGrid 
                          skips={skips} 
                          onSelect={setSelectedSkip} 
                          selectedSkip={selectedSkip}
                          loading={loading}
                          error={error}
                          onRetry={fetchSkips}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#ebebea] shadow-[0px_-2px_4px_rgba(23,26,31,0.07)] z-[100]">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center space-x-2"
              >
                <img
                  src="/images/img_frame_26.svg"
                  alt="back"
                  className="w-6 md:w-[30px] h-6 md:h-[30px]"
                />
                <span className="text-sm md:text-base">Back</span>
              </Button>
              
              <Button
                variant="primary"
                onClick={handleContinue}
                className="flex items-center space-x-2"
              >
                <span className="text-sm md:text-base">Continue</span>
                <img
                  src="/images/img_frame_26_white_a700.svg"
                  alt="continue"
                  className="w-6 md:w-[30px] h-6 md:h-[30px]"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

const SkipGrid = ({ skips, onSelect, selectedSkip, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#254d70]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500 text-center max-w-md">
          <p className="text-xl mb-4">{error}</p>
          <Button variant="primary" onClick={onRetry} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (skips.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500 text-center">
          <p className="text-xl mb-4">No skips available in your area</p>
          <p className="text-base text-gray-400">Please try a different postcode or contact support for assistance.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center relative z-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            onSelect={onSelect}
            isSelected={selectedSkip?.id === skip.id}
          />
        ))}
      </div>
    </div>
  );
};

const SkipCard = ({ skip, onSelect, isSelected }) => {
  const handleSelect = () => {
    onSelect(skip);
  };

  const additionalCosts = [];
  if (skip.transport_cost) {
    additionalCosts.push(`Transport: £${skip.transport_cost}`);
  }
  if (skip.per_tonne_cost) {
    additionalCosts.push(`Per Tonne: £${skip.per_tonne_cost}`);
  }

  return (
    <Card className="w-full max-w-[304px] mx-auto overflow-hidden flex flex-col">
      <div className="relative w-full h-[180px] rounded-t-[20px] overflow-hidden">
        <img
          src={skip.image}
          alt={skip.name}
          className="w-full h-full object-cover"
        />

        {skip.hasRestrictions && (
          <div className="absolute bottom-[10px] left-[10px] space-y-2 z-10">
            {skip.restrictions.map((restriction, index) => (
              <div
                key={index}
                className="bg-[#254d70] rounded-xl px-2 py-1.5 flex items-center space-x-2 max-w-[258px]"
              >
                <img
                  src={restriction.icon}
                  alt="warning"
                  className="w-5 h-5"
                />
                <span
                  className="text-xs font-medium leading-[18px] text-center"
                  style={{ color: restriction.color }}
                >
                  {restriction.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 text-center mt-4">
        <h3 className={`text-2xl font-medium leading-9 mb-2 ${skip.hasRestrictions ? 'text-[#8c8d8b]' : 'text-[#242524]'}`}>
          {skip.name}
        </h3>
        <p className={`text-xl font-medium leading-[30px] mb-1 ${skip.hasRestrictions ? 'text-[#254d707f]' : 'text-[#254d70]'}`}>
          {skip.price}
        </p>
        <p className={`text-sm font-normal leading-[21px] ${skip.hasRestrictions ? 'text-[#8c8d8b4c]' : 'text-[#8c8d8b]'}`}>
          {skip.duration}
        </p>
        {additionalCosts.length > 0 && (
          <div className="mt-2 text-xs text-[#8c8d8b]">
            {additionalCosts.map((cost, index) => (
              <p key={index}>{cost}</p>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-4 mt-auto">
        <Button
          variant={isSelected ? "golden" : skip.hasRestrictions ? "secondary" : "primary"}
          onClick={handleSelect}
          className="w-full h-10 text-base font-medium"
        >
          Select
        </Button>
      </div>
    </Card>
  );
};

export default SkipSelectionPage;