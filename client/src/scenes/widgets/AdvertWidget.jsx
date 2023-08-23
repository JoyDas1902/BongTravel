import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const SERVER_URL = process.env.SERVER_URL;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant='h5' fontWeight='500'>
          Sponsored
        </Typography>
        <Typography color={medium}>Ad</Typography>
      </FlexBetween>
      <img
        width='100%'
        height='auto'
        alt=''
        src={`${SERVER_URL}/assets/ad1.jpg`}
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>Domino's Pizza</Typography>
        <Typography color={medium}>dominos.co.in</Typography>
      </FlexBetween>
      <Typography color={medium} m='0.5rem 0'>
        Don't miss out on this amazing deal. Order now and satisfy your pizza
        cravings in no time. Get additional Cashback upto ₹100* with payment via
        Digital Wallet Partners. Order Now!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
