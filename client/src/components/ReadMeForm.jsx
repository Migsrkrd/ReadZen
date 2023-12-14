import MarkdownIt from 'markdown-it';
// import renderHTML from 'react-render-html';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Popper, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_README, UPDATE_README } from '../utils/mutations';
import { Link } from "react-router-dom";
import { MITLicenseText, UnlicenseText, ApacheLicenseText } from './Forms/LicenseTexts';

const ReadMeForm = (props) => {
  const myElRef=useRef(null);
    const md = MarkdownIt()
    const [formats, setFormats] = useState(() => ['bold', 'italic']);
    const [ToC, setToC] = useState(null);
    //bold, italics, code, bullets, quotes, code block, block quote, strike through, highlight
    const handleFormat = (event, newFormats) => {
      let target = event.target;
      while (target && target.getAttribute && target.getAttribute('value') === null) {
        target = target.parentNode;
      }
      const value = target.getAttribute('value');
      const selection = window.getSelection().toString();
      const range = window.getSelection().getRangeAt(0)
      const containerNode = range.commonAncestorContainer;
      const textContent = containerNode.textContent;
      const startOffset = range.startOffset;
      const endOffset = range.endOffset;
    
      const maxBefore = 20; // Maximum number of characters before the selection
      const maxAfter = 20; // Maximum number of characters after the selection
    
      const start = Math.max(0, startOffset - maxBefore);
      const end = Math.min(textContent.length, endOffset + maxAfter);
    
      const textBefore = textContent.slice(start, startOffset);
      const selectedText = textContent.slice(startOffset, endOffset);
      const textAfter = textContent.slice(endOffset, end);
    
      console.log("Text before selection:", textBefore);
      console.log("Selected text:", selectedText);
      console.log("Text after selection:", textAfter);
    
      const selected = textBefore + selectedText + textAfter;
      console.log(selected);

      if(selection){
      const regex = new RegExp(selected, "g");
      console.log(regex.split('\n'))
      // const matchesRight = [...myElRef.current.textContent.matchAll(regex)]
      // const matches = [...myElRef.current.textContent.matchAll(regex)];

      // let matchesInput;
      for (let key in userFormData) {
            const matches = userFormData[key].match(regex);
            // console.log(matches);
            if(matches){
              // matches = selectedText;
              console.log(matches);
              cases(value, key, selectedText, selected);
            }
      }
      // console.log(matchesRight)
      // console.log(matchesInput)
    }
      setFormats(newFormats);
    };

    const cases = (value, key, selectedText, selected) => {
      let replaced
      switch (value) {
        case 'bold': 
           replaced = selected.replace(selectedText, `**${selectedText}**`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'italics':
           replaced = selected.replace(selectedText, `*${selectedText}*`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'underline':
           replaced = selected.replace(selectedText, `<u>${selectedText}</u>`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'code':
           replaced = selected.replace(selectedText, `\`${selectedText}\``)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'code block':
           replaced = selected.replace(selectedText, `\`\`\`${selectedText}\`\`\``)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'bullet':
           replaced = selected.replace(selectedText, `\n * ${selectedText}`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'highlight':
           replaced = selected.replace(selectedText, `<mark>${selectedText}</mark>`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'block quote':
           replaced = selected.replace(selectedText, `\n > ${selectedText}`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'strike through':
           replaced = selected.replace(selectedText, `~~${selectedText}~~`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'h1':
           replaced = selected.replace(selectedText, `\n # ${selectedText}`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'h2':
           replaced = selected.replace(selectedText, `\n ## ${selectedText}`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'h3':
           replaced = selected.replace(selectedText, `\n ### ${selectedText}`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        case 'link':
           replaced = selected.replace(selectedText, `[${selectedText}](${selectedText})`)
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(selected, replaced) });
          break;
        default:
          // code to be executed if expression doesn't match any case
      }
    };

    const [userFormData, setUserFormData] = useState(
        props.readme
          ? {
            title:           props.readme.title,
            description:     props.readme.description,
            tableOfContents: props.readme.tableOfContents,
            installation:    props.readme.installation,
            usage:           props.readme.usage,
            credits:         props.readme.credits,
            license:         props.readme.license,
            tests:           props.readme.tests,
            repoLink:        props.readme.repoLink,
            deployedLink:    props.readme.deployedLink,
          }
          : {
            title:           '',
            description:     '',
            tableOfContents: '',
            installation:    '',
            usage:           '',
            credits:         '',
            license:         '',
            tests:           '',
            repoLink:        '',
            deployedLink:    '',
          }
    );

    const [renderToggle, setRenderToggle] = useState('code');
    const [anchorEl, setAnchorEl] = useState(null);
    const [addReadMe, {error: addReadMeError }] = useMutation(ADD_README);
    const [updateReadMe, {error: updateReadMeError }] = useMutation(UPDATE_README);

    const handleInputChange = (event) => {
      // console.log(event.target);
        let { id, value } = event.target;
        id=(id ? id : event.target.name);
        setUserFormData({ ...userFormData, [id]: value });
    };

    const handleToggle = (event) => {
      setToC(string) 
      renderToggle === 'render' ? (
      setRenderToggle('code'), setAnchorEl(null))
      : (setRenderToggle('render'), setAnchorEl(event.currentTarget));

    };
    let string;
    const tableOfContents = (userFormData)=>{
      string = (userFormData.title ? `## Table of Contents\n\n- [Title](#title)\n\n` : '') + 
      (userFormData.description ? `- [Description](#description)\n\n` : '') +
      (userFormData.installation ? `- [Installation](#installation)\n\n` : '') +
      (userFormData.usage ? `- [Usage](#usage)\n\n` : '') +
      (userFormData.credits ? `- [Credits](#credits)\n\n` : '') +
      (userFormData.license ? `- [License](#license)\n\n` : '') +
      (userFormData.tests ? `- [Tests](#tests)` : '')
      return (
        string
      )
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (props.readme) {
                // if the readme already exists (editing), then update it
                console.log('update')
                await updateReadMe({
                    variables: {
                      readMeId: props.readme._id,
                      markdown: myElRef.current.textContent,
                      datePublished: '',
                      isPublished: false,
                      ...userFormData
                    },
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
        window.location.href = '/me';
    };

    return (
        <Grid container spacing={2} disableEqualOverflow>
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
{/* 
                    <TextField
                        id='tableOfContents'  
                        label="Table of Contents"
                        value={userFormData.tableOfContents}
                        onChange={handleInputChange}
                        fullWidth
                        multiline
                        margin="normal"
                    /> */}

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
                        multiline
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
                    
                    {/* <TextField
                        id='license'  
                        label="License"
                        value={userFormData.license}
                        onChange={handleInputChange}
                        fullWidth
                        multiline
                        margin="normal"
                    /> */}

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">License</InputLabel>
                        <Select
                            id='license'
                            name='license'
                            value={userFormData.license}
                            label="License"
                            onChange={handleInputChange}
                        >
                            <MenuItem value={MITLicenseText}    >MIT</MenuItem>
                            <MenuItem value={UnlicenseText}     >The Unlicense</MenuItem>
                            <MenuItem value={ApacheLicenseText} >Apache License 2.0</MenuItem>
                        </Select>
                    </FormControl>

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
                        disabled={!(userFormData.title) || renderToggle === 'render'}
                        type='submit'
                        variant='contained'
                    >
                        Save
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
                <FormControlLabel
                    control={
                        <Switch onChange={(event) => handleToggle(event)} />
                    }
                    label="Render"
                />

                <Popper  
                    id={id}
                    open={open}
                    anchorEl={anchorEl}    
                    placement='top-start'
                >
                    Note: You can only save when rendering is off
                </Popper>

                <ToggleButtonGroup
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                >

                    {/*  BOLD            */}
                    <ToggleButton value="bold" aria-label="bold" >
                        <strong>B</strong>
                    </ToggleButton>

                    {/*  ITALICS         */}
                    <ToggleButton value="italics" aria-label="bold" >
                        <em >I</em>
                    </ToggleButton>

                    {/*  UNDERLINE       */}
                    <ToggleButton value="underline" aria-label="bold" >
                        <u>U</u>
                    </ToggleButton>

                    {/*  CODE            */}
                    <ToggleButton value="code" aria-label="bold" >
                        code
                    </ToggleButton>

                    {/*  CODE BLOCK      */}
                    <ToggleButton value="code block" aria-label="bold" >
                        code block
                    </ToggleButton>

                    {/*  BULLETED LIST   */}
                    <ToggleButton value="bullet" aria-label="bold" >
                        •
                    </ToggleButton>

                    {/*  HIGHLIGHT       */}
                    <ToggleButton value="highlight" aria-label="bold" >
                        highlight
                    </ToggleButton>

                    {/*  BLOCK QUOTE     */}
                    <ToggleButton value="block quote" aria-label="bold" >
                        blockquote
                    </ToggleButton>

                    {/*  STRIKE THROUGH  */}
                    <ToggleButton value="strike through" aria-label="bold" >
                        <p style={{ textDecoration: 'line-through' }}>Strike Through</p>
                    </ToggleButton>

                    {/*  HEADING 1       */}
                    <ToggleButton value="h1" aria-label="bold" >
                        H1
                    </ToggleButton>

                    {/*  HEADING 2       */}
                    <ToggleButton value="h2" aria-label="bold" >
                        H2
                    </ToggleButton>

                    {/*  HEADING 3       */}
                    <ToggleButton value="h3" aria-label="bold" >
                        H3
                    </ToggleButton>

                    {/*  LINK            */}
                    <ToggleButton value="link" aria-label="bold" >
                        Link
                    </ToggleButton>
                
                </ToggleButtonGroup>

            </FormGroup>

                {renderToggle === 'code' ?
                <pre ref={myElRef}>
                  {userFormData.title ? `# ${userFormData.title} \n\n` : ''}
                  {userFormData.description ? `## Description\n\n${userFormData.deployedLink ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n` : ''}${userFormData.description}\n\n` : ''}
                  {`${tableOfContents(userFormData)}\n\n`}
                  {userFormData.installation ? `## Installation\n\n ${userFormData.installation}\n\n` : ''}
                  {userFormData.usage ? `## Usage\n\n ${userFormData.usage}\n\n` : ''}
                  {userFormData.credits ? `## Credits\n\n ${userFormData.credits}\n\n` : ''}
                  {userFormData.license ? `## License\n\n ${userFormData.license}\n\n` : ''}
                  {userFormData.tests ? `## Test\n\n ${userFormData.tests}\n\n` : ''}
                </pre>
                // <textarea 
                //     ref={myElRef}
                //     readOnly
                //     value={
                //         `${userFormData.title ? `# ${userFormData.title} \n\n` : ''}${
                //         userFormData.description ? `## Description\n\n${userFormData.deployedLink ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n` : ''}${userFormData.description}\n\n` : ''}${
                //         `${tableOfContents(userFormData)}\n\n`}${
                //         userFormData.installation ? `## Installation\n\n ${userFormData.installation}\n\n` : ''}${
                //         userFormData.usage ? `## Usage\n\n ${userFormData.usage}\n\n` : ''}${
                //         userFormData.credits ? `## Credits\n\n ${userFormData.credits}\n\n` : ''}${
                //         userFormData.license ? `## License\n\n ${userFormData.license}\n\n` : ''}${
                //         userFormData.tests ? `## Test\n\n ${userFormData.tests}\n\n` : ''}`
                //     }
                // ></textarea>
              : 
                <div >
                <div dangerouslySetInnerHTML={{__html: md.render(`${
                    (userFormData.title ? `# ${userFormData.title} \n\n` : '')}${
                    (userFormData.description ? `## Description\n\n${userFormData.deployedLink ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n` : ''}${userFormData.description}\n\n` : '')}${
                    (`${ToC}\n\n`)}${
                    (userFormData.installation ? `## Installation\n\n ${userFormData.installation}\n\n` : '')}${
                    (userFormData.usage ? `## Usage\n\n ${userFormData.usage}\n\n`:'')}${
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
