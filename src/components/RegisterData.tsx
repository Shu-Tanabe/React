import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { DisplayErrorMessage } from './DisplayErrorMessage';
import { PlaceHolders } from '../messages/PlaceHolders';

/* material core */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';

/* material lab */
import Autocomplete from '@material-ui/lab/Autocomplete';


/* material icons */
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

/* material-table */
import MaterialTable from 'material-table';

const dataFilePath: string = 'keys.json';

const tableIcons = {
    // Add: forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />),
    // Check: forwardRef<SVGSVGElement>((props, ref) => <Check {...props} ref={ref} />),
    // Clear: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    // Delete: forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />),
    // DetailPanel: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    // Edit: forwardRef<SVGSVGElement>((props, ref) => <Edit {...props} ref={ref} />),
    // Export: forwardRef<SVGSVGElement>((props, ref) => <SaveAlt {...props} ref={ref} />),
    // Filter: forwardRef<SVGSVGElement>((props, ref) => <FilterList {...props} ref={ref} />),
    // FirstPage: forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
    // LastPage: forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
    // NextPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    // PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
    // ResetSearch: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    // Search: forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
    // SortArrow: forwardRef<SVGSVGElement>((props, ref) => <ArrowDownward {...props} ref={ref} />),
    // ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => <Remove {...props} ref={ref} />),
    // ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />)

    Add: React.forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />),
    Check: React.forwardRef<SVGSVGElement>((props, ref) => <Check {...props} ref={ref} />),
    Clear: React.forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    Delete: React.forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: React.forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: React.forwardRef<SVGSVGElement>((props, ref) => <Edit {...props} ref={ref} />),
    Export: React.forwardRef<SVGSVGElement>((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: React.forwardRef<SVGSVGElement>((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: React.forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: React.forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: React.forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: React.forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: React.forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    Search: React.forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: React.forwardRef<SVGSVGElement>((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: React.forwardRef<SVGSVGElement>((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: React.forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />)

    // Add: forwardRef<SVGSVGElement>(() => <AddBox />),
    // Check: forwardRef<SVGSVGElement>(() => <Check />),
    // Clear: forwardRef<SVGSVGElement>(() => <Clear />),
    // Delete: forwardRef<SVGSVGElement>(() => <DeleteOutline />),
    // DetailPanel: forwardRef<SVGSVGElement>(() => <ChevronRight />),
    // Edit: forwardRef<SVGSVGElement>(() => <Edit />),
    // Export: forwardRef<SVGSVGElement>(() => <SaveAlt />),
    // Filter: forwardRef<SVGSVGElement>(() => <FilterList />),
    // FirstPage: forwardRef<SVGSVGElement>(() => <FirstPage />),
    // LastPage: forwardRef<SVGSVGElement>(() => <LastPage />),
    // NextPage: forwardRef<SVGSVGElement>(() => <ChevronRight />),
    // PreviousPage: forwardRef<SVGSVGElement>(() => <ChevronLeft />),
    // ResetSearch: forwardRef<SVGSVGElement>(() => <Clear />),
    // Search: forwardRef<SVGSVGElement>(() => <Search />),
    // SortArrow: forwardRef<SVGSVGElement>(() => <ArrowDownward />),
    // ThirdStateCheck: forwardRef<SVGSVGElement>(() => <Remove />),
    // ViewColumn: forwardRef<SVGSVGElement>(() => <ViewColumn />)
}

type FormLabels = {
    id: string
    name: string
    preference: string
}

const formLabels: FormLabels = {
    id: "ID",
    name: "Your Name",
    preference: "Your Preference"
}

const kindOfLiquor: string[] = [
    "whiskey",
    "wine",
    "sake",
    "jin",
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        textFieldSet: {
            height: '10vh',
            marginBottom: '5vh'
        },
        labelArea: {
            fontSize: '16px',
            color: '#616161'
        },
        textField: {
            width: '100%',
        },
        errorMessageArea: {
            color: 'red'
        }
    }),
);


type UserOption = {
    [optionKey: string]: any
}

type User = {
    user_id: string
    user_name: string
    preference: string
    options: UserOption
}

function getSteps() {
    return ['Enter the form below', 'Check what you entered', 'Done'];
}

const RegisterData: React.FC = () => {
    const tableRef = React.createRef();
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [optionArray, setOption] = useState<UserOption[]>([{
        example: 'example'
    }]);
    const [columns, setColumn] = useState([
        { title: 'Key', field: 'key' },
        { title: 'Value', field: 'value' }
    ]);
    const steps = getSteps();
    const { errors, handleSubmit, register } = useForm<User>({
        mode: 'onBlur'
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = (data: User) => {
        console.log(data);
    };

    let test: UserOption[] = [];
    type ArrObj = {
        [key: string]: string[]
    }

    const fetchKeyData = () =>
        new Promise<void>(() => {
            fetch(dataFilePath, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then((result) => result.json())
                .then((results: ArrObj) => {
                    results.keys.map((result) => {
                        test.push({ 'key': result, 'value': "" });
                    });
                    setOption(test);
                })
                .catch(() => {
                    console.log("Error: cannot fetch json data.");
                })
        });

    useEffect(() => {
        fetchKeyData();
    }, []);
    // useEffect(() => {
    //     const tableRefCurrent: any = tableRef.current;
    //     if (tableRef && tableRefCurrent) tableRefCurrent.onQueryChange();
    // }, [optionArray]);

    return (
        <div className={classes.root}>
            <Box
                boxShadow={1}
                bgcolor="background.paper"
                m={1}
                p={1}
            >
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className={classes.textFieldSet}>
                        <label className={classes.labelArea}>{formLabels.id}</label>
                        <div>
                            <TextField
                                className={classes.textField}
                                name="user_id"
                                variant="outlined"
                                placeholder={PlaceHolders.p0002}
                                defaultValue=""
                                inputRef={register({ required: true })}
                            />
                        </div>
                        <div className={classes.errorMessageArea}>
                            {errors.user_id ? <DisplayErrorMessage /> : <></>}
                        </div>
                    </div>

                    <div className={classes.textFieldSet}>
                        <label className={classes.labelArea}>{formLabels.name}</label>
                        <div>
                            <TextField
                                className={classes.textField}
                                name="user_name"
                                variant="outlined"
                                placeholder={PlaceHolders.p0003}
                                defaultValue=""
                                inputRef={register({ required: true })}
                            />
                        </div>
                        <div className={classes.errorMessageArea}>
                            {errors.user_name ? <DisplayErrorMessage /> : <></>}
                        </div>
                    </div>

                    <label className={classes.labelArea}>{formLabels.preference}</label>
                    <Autocomplete
                        multiple={true}
                        filterSelectedOptions
                        id="auto-complete"
                        includeInputInList
                        renderInput={(params) => <TextField {...params} margin="normal" variant='outlined' placeholder={PlaceHolders.p0001} />}
                        options={kindOfLiquor}
                    />
                </form>
            </Box>
            <MaterialTable
                title="test table"
                columns={columns}
                // data={query =>
                //     new Promise((resolve, reject) => {
                //         resolve({
                //             data: JSON.parse(JSON.stringify(optionArray)),
                //             page: 0,
                //             totalCount: 10
                //         })
                //         console.log(JSON.parse(JSON.stringify(optionArray)));
                //     })
                // }

                // data={optionArray}

                data={
                    [
                        { 'key': 'test1', 'value': 'testVal1' },
                        { 'key': 'test2', 'value': 'testVal1' },
                        { 'key': 'test3', 'value': 'testVal1' },
                        { 'key': 'test4', 'value': 'testVal1' },
                        { 'key': 'test5', 'value': 'testVal1' },
                        { 'key': 'test6', 'value': 'testVal1' },
                    ]
                }
                icons={tableIcons}
                tableRef={tableRef}
                options={{
                    search: true
                }}
            />
            <div>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                >
                    Back
                    </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    );
};

export default RegisterData;