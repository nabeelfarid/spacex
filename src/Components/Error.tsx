import { Box, Typography } from "@material-ui/core";

export interface ErrorProps {
  error: any;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Box mt={4} textAlign="center" role="error-panel">
      <Typography variant="h4" color="error" gutterBottom>
        ERROR:
      </Typography>

      <Typography component="div">
        <Box letterSpacing={4}>{JSON.stringify(error)}</Box>
      </Typography>
    </Box>
  );
};

export default Error;
