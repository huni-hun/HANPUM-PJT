import { Slider } from '@mui/material';
import * as R from './ToggleSlider.styled';
import { useState } from 'react';
import { colors } from '@/styles/colorPalette';

interface ToggleSliderProps {
  title: string;
  unit: string;
  min?: number;
  max?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}

function ToggleSlider({
  title,
  unit,
  min = 0,
  max = 15,
  initialValue = 0,
  onChange,
}: ToggleSliderProps) {
  const [sliderValue, setSliderValue] = useState(initialValue);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSliderValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <R.SliderBox>
      <R.SliderTextBox>
        <R.SliderText>{title}</R.SliderText>
        <R.ContentText>{`${min}${unit} ${sliderValue > 0 ? `~ ${sliderValue}${unit}` : ''}`}</R.ContentText>
      </R.SliderTextBox>
      <Slider
        size="medium"
        min={min}
        max={max}
        value={sliderValue}
        onChange={handleSliderChange}
        aria-label={title}
        valueLabelDisplay="auto"
        sx={{
          color: colors.main,
          height: 8,
          '& .MuiSlider-thumb': {
            width: 25,
            height: 25,
            color: colors.white,
          },
          '& .MuiSlider-rail': {
            height: '0.7rem',
            color: 'grey',
          },
        }}
      />
    </R.SliderBox>
  );
}

export default ToggleSlider;
