import MarkdownIt from 'markdown-it';
// import renderHTML from 'react-render-html';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_README, UPDATE_README } from '../utils/mutations';
import { Link } from "react-router-dom";
import { saveAs } from 'file-saver';
// import { useHistory } from 'react-router-dom';


const ReadMeForm = (props) => {
  const myElRef=useRef(null);

  function createFile() {

    const myElement = myElRef.current.textContent;
    console.log(myElement);
    const fileContent = myElement;
    const fileName = 'README.md';
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
  }

  // const history = useHistory();
    const md = MarkdownIt()
    const [formats, setFormats] = useState(() => ['bold', 'italic']);

    //bold, italics, code, bullets, quotes, code block, block quote, strike through, highlight
    const handleFormat = (event, newFormats) => {
      let target = event.target;
      while (target && target.getAttribute && target.getAttribute('value') === null) {
        target = target.parentNode;
      }
      const value = target.getAttribute('value');
      const selection = window.getSelection().toString();
      if(selection){
      const regex = new RegExp(window.getSelection().toString(), "gi");
      for (let key in userFormData) {
            const matches = userFormData[key].match(regex);
            if(matches){
              cases(value, key, matches);
            }
      }
    }
      setFormats(newFormats);
    };

    const cases = (value, key, matches) => {
      switch (value) {
        case 'bold': 
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` **${matches[0]}** `) });
          break;
        case 'italics':
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` *${matches[0]}* `) });
          break;
          case 'underline':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` <u>${matches[0]}</u> `) });
            break;
          case 'code':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` \`${matches[0]}\` `) });
           break;
           case 'code block':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` \`\`\`${matches[0]}\`\`\` `) });
           break;
           case 'bullet':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`\n * ${matches[0]}`) });
           break;
           case 'highlight':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` <mark> ${matches[0]} </mark> `) });
           break;
           case 'block quote':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`\n > ${matches[0]}`) });
           break;
           case 'strike through':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` ~~${matches[0]}~~ `) });
           break;
           case 'h1':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`\n # ${matches[0]} `) });
           break;
           case 'h2':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`\n ## ${matches[0]} `) });
           break;
           case 'h3':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`\n ### ${matches[0]} `) });
           break;
           case 'link':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`[${matches[0]}](${matches[0]}) `) });
           break;
        default:
          // code to be executed if expression doesn't match any case
      }
    }





    const [userFormData, setUserFormData] = useState((props.readme ? props.readme : {
        title: '',
        description: '',
        tableOfContents:'',
        installation: '',
        usage: '',
        credits: '',
        license: '',
        tests:'',
        repoLink: '',
        deployedLink: ''
    }));
    const [renderToggle, setRenderToggle] = useState('code');

    const [addReadMe, {error: addReadMeError }] = useMutation(ADD_README);
    const [updateReadMe, {error: updateReadMeError }] = useMutation(UPDATE_README);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setUserFormData({ ...userFormData, [id]: value });
    };

    const handleToggle = () => {
        setRenderToggle(renderToggle === 'render' ? 'code' : 'render');
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('submit')
        // console.log(props.readme);
        // console.log(myElRef.current.textContent)
        try {
            if (props.readme) {
                // if the readme already exists (editing), then update it
                await updateReadMe({
                    variables: { readMeId: props.readme._id, markdown:myElRef.current.textContent, ...userFormData },
                });
            } else {
                // if the readme doesn't exist (adding), create a new one
                await addReadMe({
                    variables: {markdown:myElRef.current.textContent, ...userFormData },
                });
            }
        } catch (e) {
          console.error(e);
        }
  
        // clear the form
        setUserFormData({
            title: '',
            description: '',
            tableOfContents:'',
            installation: '',
            usage: '',
            credits: '',
            license: '',
            tests:'',
            repoLink: '',
            deployedLink: '',
        });

        // go back to the profiles page
        // history.push('/me');
    };

    return (
        <Grid container spacing={2}>
            <Grid xs={6}>
                <Box 
                component="form"
                sx={{
                '& > :not(style)': { m: 1 },
                }}
                onSubmit={handleFormSubmit}
                noValidate
                autoComplete="off"
                >
                    <TextField
                    spellCheck='true'
                    id='title'  
                    label="Title"
                    value={userFormData.title}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='description'  
                    label="Description"
                    value={userFormData.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='tableOfContents'  
                    label="Table of Contents"
                    value={userFormData.tableOfContents}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='installation'  
                    label="Installation"
                    value={userFormData.installation}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='usage'  
                    label="Usage"
                    value={userFormData.usage}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    />

                    <TextField
                    id='credits'  
                    label="Credits"
                    value={userFormData.credits}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />
                    
                    <TextField
                    id='license'  
                    label="License"
                    value={userFormData.license}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='tests'  
                    label="Tests"
                    value={userFormData.tests}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='repoLink'  
                    label="Repository Link"
                    value={userFormData.repoLink}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='deployedLink'  
                    label="Deployed Link"
                    value={userFormData.deployedLink}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <Button
                    disabled={!(userFormData.title)}
                    // onClick= {() => userFormData.isPublished = true}
                    type='submit'
                    variant='contained'
                    >
                        Save
                    </Button>
                    <Button
                    onClick={createFile}>
                      Create File
                    </Button>
                    <Link to='/me' >
                        <Button
                        type='button'
                        variant='contained'
                        >
                            Cancel
                        </Button>
                    </Link>

                </Box>
            </Grid>
            <Grid xs={6}>
            <FormGroup>
                <FormControlLabel  control={<Switch onChange={handleToggle}/>} label="Render" />
                <ToggleButtonGroup
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting">
                <ToggleButton value="bold" aria-label="bold" >
                  <strong>B</strong>
                </ToggleButton>
                <ToggleButton value="italics" aria-label="bold" >
                  <em >I</em>
                </ToggleButton>
                <ToggleButton value="underline" aria-label="bold" >
                  <u>U</u>
                </ToggleButton>
                <ToggleButton value="code" aria-label="bold" >
                  code
                </ToggleButton>
                <ToggleButton value="code block" aria-label="bold" >
                  code block
                </ToggleButton>
                <ToggleButton value="bullet" aria-label="bold" >
                  •
                </ToggleButton>
                <ToggleButton value="highlight" aria-label="bold" >
                  highlight
                </ToggleButton>
                <ToggleButton value="block quote" aria-label="bold" >
                  blockquote
                </ToggleButton>
                <ToggleButton value="strike through" aria-label="bold" >
                <p style={{ textDecoration: 'line-through' }}>Strike Through</p>
                </ToggleButton>
                <ToggleButton value="h1" aria-label="bold" >
                  H1
                </ToggleButton>
                <ToggleButton value="h2" aria-label="bold" >
                  H2
                </ToggleButton>
                <ToggleButton value="h3" aria-label="bold" >
                  H3
                </ToggleButton>
                <ToggleButton value="link" aria-label="bold" >
                  Link
                </ToggleButton>
                
                </ToggleButtonGroup>
            </FormGroup>
                {renderToggle === 'code' ?
                <pre ref={myElRef}>
                  {userFormData.title ? `# ${userFormData.title} \n\n` : ''}
                  {userFormData.description ? `## Description\n\n${userFormData.deployedLink ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n` : ''}${userFormData.description}\n\n` : ''}
                  {userFormData.tableOfContents ? `## Table of Contents\n\n ${userFormData.tableOfContents}\n\n` : ''}
                  {userFormData.installation ? `## Installation\n\n ${userFormData.installation}\n\n` : ''}
                  {userFormData.usage ? `## Usage\n\n ${userFormData.installation}\n\n` : ''}
                  {userFormData.credits ? `## Credits\n\n ${userFormData.credits}\n\n` : ''}
                  {userFormData.license ? `## License\n\n ${userFormData.license}\n\n` : ''}
                  {userFormData.tests ? `## Test\n\n ${userFormData.tests}\n\n` : ''}
                </pre>
                : 
                <div >
                <div dangerouslySetInnerHTML={{__html: md.render(`${
                    (userFormData.title ? `# ${userFormData.title} \n\n` : '')}${
                    (userFormData.description ? `## Description\n\n${userFormData.deployedLink ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n` : ''}${userFormData.description}\n\n` : '')}${
                    (userFormData.tableOfContents ? `## Table of Contents\n\n ${userFormData.tableOfContents}\n\n` : '')}${
                    (userFormData.installation ? `## Installation\n\n ${userFormData.installation}\n\n` : '')}${
                    (userFormData.usage ? `## Usage\n\n ${userFormData.installation}\n\n`:'')}${
                    (userFormData.credits ? `## Credits\n\n ${userFormData.credits}\n\n`:'')}${
                    (userFormData.license ? `## License\n\n ${userFormData.license}\n\n`:'')}${
                    (userFormData.tests ? `## Test\n\n ${userFormData.tests}\n\n`:'')}
                `)}}></div>
                </div>
                }
            </Grid>
        </Grid>
    );
}

export default ReadMeForm;
