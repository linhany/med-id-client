import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

//Routes';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Overview from './components/pages/Overview';
import ConsultationSchedule from './components/pages/ConsultationSchedule';
import Patient from './components/pages/Patient';

import Master from './components/pages/Master';

const routes = [
    {
        path: '/doctor/:doctorId/overview',  //append activeDoctor +
        sidebar: () => <Overview />,
        main: () => <Overview />
    },
    {
        path: '/doctor/:doctorId/consultation-schedule',
        sidebar: () => <ConsultationSchedule />,
        main: () => <ConsultationSchedule />
    },
    {
        path: '/patient',
        sidebar: () => <Patient />,
        main: () => <Patient />
    }
]

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Master>
                        <Routes>
                            {routes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<route.main />}
                                    />
                            ))}
                        </Routes>
                    </Master>
                </Router>
            </ThemeProvider>
        </Provider>
    );
  }
}

export default App;
