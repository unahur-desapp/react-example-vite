import { Box, Button, Stack, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/store";

function AddPreference() {
  const [newPreferenceText, setNewPreferenceText] = useState('');
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const reduxDispatch = useDispatch();

  const doAddPreference = useCallback((newPreference) => {
    reduxDispatch(actions.preferences.addPreference(newPreference));
    setTouched(false);
    setNewPreferenceText('');
    setErrorMessage(null);
  }, []);

  return <Stack direction='row' alignItems='center' sx={{ mb: 6 }}>
    <TextField label='Ingrese la nueva preferencia' variant='standard' fullWidth
      value={newPreferenceText} onChange={event => {
        setTouched(true);
        setNewPreferenceText(event.target.value);
        setErrorMessage(event.target.value.length < 5 ? 'Debe ingresar al menos 5 caracteres' : null)
      }}
      error={touched && !!errorMessage}
      helperText={touched ? errorMessage : null}
    />
    <Button variant='contained' color='success' sx={{ ml: 4 }} disabled={!touched || !!errorMessage} onClick={() => {
      doAddPreference(newPreferenceText);
    }}>
      <Box sx={{ px: 2 }}>Agregar</Box>
    </Button>
    <Button variant='contained' color='secondary' sx={{ ml: 4 }} onClick={() => {
      setTouched(false);
      setNewPreferenceText('');
      setErrorMessage(null);
    }}>
      Limpiar
    </Button>
  </Stack>
}

function AllPreferences() {
  const reduxDispatch = useDispatch();
  const preferences = useSelector(state => state.preferences.allPreferences);

  console.log('in AllPreferences');
  console.log(preferences);

  return <Stack direction='column' spacing={2}>
    {preferences.map(pref => {
      return (
        <Stack direction='row' key={pref.text} alignItems='flex-end'>
          <Box sx={{ width: '60%', typography: 'body1' }}>{pref.text}</Box>
          <Box sx={{ width: '20%', typography: 'body1' }}>{pref.votes}</Box>
          <Box sx={{ width: '20%', }}>
            <Button variant='contained' color='primary' onClick={() => {
              reduxDispatch(actions.preferences.registerVote(pref.text));              
            }}>
              +1
            </Button>
          </Box>
        </Stack>
      )
    })}
  </Stack>;
}

function LastPreferences() {
  const preferences = useSelector(state => state.preferences.lastPreferences);

  return <Stack direction='column' spacing={2}>
    {preferences.map(pref => {
      return (
        <Stack direction='row' key={pref.text}>
          <Box sx={{ width: '80%', typography: 'body1' }}>{pref.text}</Box>
          <Box sx={{ width: '20%', typography: 'body1' }}>{pref.votes}</Box>
        </Stack>
      )
    })}
  </Stack>;
}

function MostVotedPreferences() {
  const preferences = useSelector(state => state.preferences.mostVotedPreferences);

  return <Stack direction='column' spacing={2}>
    {preferences.map(pref => {
      return (
        <Stack direction='row' key={pref.text}>
          <Box sx={{ width: '80%', typography: 'body1' }}>{pref.text}</Box>
          <Box sx={{ width: '20%', typography: 'body1' }}>{pref.votes}</Box>
        </Stack>
      )
    })}
  </Stack>;
}

export function Preferences() {
  return <Stack direction='column' sx={{ mx: '10%', my: 4 }}>
    <AddPreference />
    <Stack direction='row'>
      <Box sx={{ width: '33%', mr: 8 }}>
        <AllPreferences />
      </Box>
      <Box sx={{ width: '25%' }}>
        <MostVotedPreferences />
      </Box>
      <Box sx={{ width: '25%' }}>
        <LastPreferences />
      </Box>
    </Stack>
  </Stack>
}