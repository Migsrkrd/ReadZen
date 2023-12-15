import MarkdownIt from "markdown-it";
import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Popper, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { ADD_README, UPDATE_README } from "../utils/mutations";
import { Link } from "react-router-dom";
import { MITLicenseText, UnlicenseText, ApacheLicenseText } from './Forms/LicenseTexts';

const ReadMeForm = (props) => {
  //sets the reference area to null
  const myElRef=useRef(null);
  //calls the markdown
    const md = MarkdownIt()
    const [ToC, setToC] = useState(null);
    //bold, italics, code, bullets, quotes, code block, block quote, strike through, highlight
    const handleFormat = (event) => {
      //checks which toggle has been clicked
      let target = event.target;
      while (target && target.getAttribute && target.getAttribute('value') === null) {
        target = target.parentNode;
      }
      const value = target.getAttribute('value');
      //gets the user highlighted section as well as 10 characters before and after
      const selection = window.getSelection().toString();
      const range = window.getSelection().getRangeAt(0)
      const containerNode = range.commonAncestorContainer;
      const textContent = containerNode.textContent;
      const startOffset = range.startOffset;
      const endOffset = range.endOffset;
      const maxBefore = 10; // Maximum number of characters before the selection
      const maxAfter = 10; // Maximum number of characters after the selection
      const start = Math.max(0, startOffset - maxBefore);
      const end = Math.min(textContent.length, endOffset + maxAfter);
      const textBefore = textContent.slice(start, startOffset);
      const selectedText = textContent.slice(startOffset, endOffset);
      const textAfter = textContent.slice(endOffset, end);
    
      let selected = textBefore + selectedText + textAfter;
      //checks that something has been highlighted
      if(selection){
        //splits the string if a return exists
      const arr=selected.split('\n')
      let longestString = "";

      for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === "string" && arr[i].length > longestString.length) {
          longestString = arr[i];
        }
      }
      // makes the longest string into a regex
      let regex = new RegExp(longestString, "g");
      if(arr.length>1){
        selected=longestString;
      }
      //checks if the regex matches anywhere in the input fields
      for (let key in userFormData) {
            const matches = userFormData[key].match(regex);
            if(matches){

              cases(value, key, selectedText, selected);
            }
      }
    }
    };
    //cases to replace the highlighted text with the appropriate markdown styling
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
    //use state for all the input boxes
    //if the user is editing it uses props to fill in the fields
  const [userFormData, setUserFormData] = useState(
    props.readme
      ? {
          title: props.readme.title,
          description: props.readme.description,
          tableOfContents: props.readme.tableOfContents,
          installation: props.readme.installation,
          usage: props.readme.usage,
          credits: props.readme.credits,
          license: props.readme.license,
          tests: props.readme.tests,
          repoLink: props.readme.repoLink,
          deployedLink: props.readme.deployedLink,
        }
      : {
          title: "",
          description: "",
          tableOfContents: "",
          installation: "",
          usage: "",
          credits: "",
          license: "",
          tests: "",
          repoLink: "",
          deployedLink: "",
        }
  );

  const [renderToggle, setRenderToggle] = useState("code");
  const [anchorEl, setAnchorEl] = useState(null);
  const [addReadMe, { error: addReadMeError }] = useMutation(ADD_README);
  const [updateReadMe, { error: updateReadMeError }] =
    useMutation(UPDATE_README);
//handles user typing into and input box and updates the correct one 
  const handleInputChange = (event) => {
    let { id, value } = event.target;
    id = id ? id : event.target.name;
    setUserFormData({ ...userFormData, [id]: value });
  };
//changes whether the user is seeing markdown or the render
  const handleToggle = (event) => {
    setToC(string);
    renderToggle === "render"
      ? (setRenderToggle("code"), setAnchorEl(null))
      : (setRenderToggle("render"), setAnchorEl(event.currentTarget));
  };
  let string;
  //creates the table of contents
  const tableOfContents = (userFormData) => {
    string =
      (userFormData.title
        ? `## Table of Contents\n\n- [Title](#title)\n\n`
        : "") +
      (userFormData.description ? `- [Description](#description)\n\n` : "") +
      (userFormData.installation ? `- [Installation](#installation)\n\n` : "") +
      (userFormData.usage ? `- [Usage](#usage)\n\n` : "") +
      (userFormData.credits ? `- [Credits](#credits)\n\n` : "") +
      (userFormData.license ? `- [License](#license)\n\n` : "") +
      (userFormData.tests ? `- [Tests](#tests)` : "");
    return string;
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (props.readme) {
        // if the readme already exists (editing), then update it
        await updateReadMe({
          variables: {
            readMeId: props.readme._id,
            //refernces the created markdown text on the page
            markdown: myElRef.current.textContent,
            datePublished: "",
            isPublished: false,
            ...userFormData,
          },
        });
      } else {
        // if the readme doesn't exist (adding), create a new one
        await addReadMe({
          variables: { markdown: myElRef.current.textContent, ...userFormData },
        });
      }
    } catch (e) {
      console.error(e);
    }

    // clear the form
    setUserFormData({
      title: "",
      description: "",
      tableOfContents: "",
      installation: "",
      usage: "",
      credits: "",
      license: "",
      tests: "",
      repoLink: "",
      deployedLink: "",
    });
    window.location.href = "/me";
  };

  return (
    <Grid container spacing={0}>
      <Grid xs={12} md={6} style={{paddingRight: "15px"}}>
        <Box
          className="formBox"
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          onSubmit={handleFormSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            className="textFields"
            inputProps={{spellCheck:"true"}}
            id="title"
            label="Title"
            value={userFormData.title}
            onChange={handleInputChange}
            fullWidth
            multiline
            margin="normal"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a80038',
              },
              '& label.Mui-focused': {
                color: '#a80038',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#a80038',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a80038',
                },
                '&:hover fieldset': {
                  borderColor: '#a80038',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#a80038',
                },
              
            }}}
          />

          <TextField
            className="textFields"
            id="description"
            label="Description"
            value={userFormData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            margin="normal"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a80038',
              },
              '& label.Mui-focused': {
                color: '#a80038',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#a80038',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a80038',
                },
                '&:hover fieldset': {
                  borderColor: '#a80038',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#a80038',
                },
              
            }}}
          />
          <TextField
            className="textFields"
            id="installation"
            label="Installation"
            value={userFormData.installation}
            onChange={handleInputChange}
            fullWidth
            multiline
            margin="normal"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a80038',
              },
              '& label.Mui-focused': {
                color: '#a80038',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#a80038',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a80038',
                },
                '&:hover fieldset': {
                  borderColor: '#a80038',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#a80038',
                },
              
            }}}
          />

          <TextField
            className="textFields"
            id="usage"
            label="Usage"
            value={userFormData.usage}
            onChange={handleInputChange}
            fullWidth
            multiline
            margin="normal"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a80038',
              },
              '& label.Mui-focused': {
                color: '#a80038',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#a80038',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a80038',
                },
                '&:hover fieldset': {
                  borderColor: '#a80038',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#a80038',
                },
              
            }}}
          />

          <TextField
            className="textFields"
            id="credits"
            label="Credits"
            value={userFormData.credits}
            onChange={handleInputChange}
            fullWidth
            multiline
            margin="normal"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a80038',
              },
              '& label.Mui-focused': {
                color: '#a80038',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#a80038',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a80038',
                },
                '&:hover fieldset': {
                  borderColor: '#a80038',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#a80038',
                },
              
            }}}
          />
          <FormControl fullWidth
           sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#a80038',
            },
            '& label.Mui-focused': {
              color: '#a80038',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#a80038',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#a80038',
              },
              '&:hover fieldset': {
                borderColor: '#a80038',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#a80038',
              },
            
          }}}>
            <InputLabel id="demo-simple-select-label">License</InputLabel>
            <Select
              className="textFields"
              id="license"
              name="license"
              value={userFormData.license}
              label="License"
              onChange={handleInputChange}
              
            >
              <MenuItem
              style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      maxWidth: '100%', // Optionally set a maximum width
    }}
                value={MITLicenseText}
              >
                MIT
              </MenuItem>
              <MenuItem
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                maxWidth: '100%', // Optionally set a maximum width
              }}
                value={UnlicenseText}
              >
                The Unlicense
              </MenuItem>
              <MenuItem
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                maxWidth: '100%', // Optionally set a maximum width
              }}
                value={ApacheLicenseText}
              >
                Apache License 2.0
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            className="textFields"
            id="tests"
            label="Tests"
            value={userFormData.tests}
            onChange={handleInputChange}
            fullWidth
            multiline
            margin="normal"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a80038',
              },
              '& label.Mui-focused': {
                color: '#a80038',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#a80038',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a80038',
                },
                '&:hover fieldset': {
                  borderColor: '#a80038',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#a80038',
                },
              
            }}}
          />

          <TextField
            className="textFields"
            id="repoLink"
            label="Repository Link"
            value={userFormData.repoLink}
            onChange={handleInputChange}
            fullWidth
            multiline
            margin="normal"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a80038',
              },
              '& label.Mui-focused': {
                color: '#a80038',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#a80038',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a80038',
                },
                '&:hover fieldset': {
                  borderColor: '#a80038',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#a80038',
                },
              
            }}}
          />

          <TextField
            className="textFields"
            id="deployedLink"
            label="Deployed Link"
            value={userFormData.deployedLink}
            onChange={handleInputChange}
            fullWidth
            multiline
            margin="normal"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a80038',
              },
              '& label.Mui-focused': {
                color: '#a80038',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#a80038',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a80038',
                },
                '&:hover fieldset': {
                  borderColor: '#a80038',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#a80038',
                },
              
            }}}
          />
          <div className="create-buttons">
          <Button
            disabled={!userFormData.title || renderToggle === "render"}
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#a80038",
              '&:hover': {
                backgroundColor: '#fd0054',
              },
            }}
          >
            Save
          </Button>
          <Link to="/me">
            <Button type="button" variant="contained"
            sx={{
              backgroundColor: "#a80038",
              '&:hover': {
                backgroundColor: '#fd0054',
              },
            }}>
              Cancel
            </Button>
          </Link>
          </div>
        </Box>
      </Grid>
      <Grid xs={12} md={6} style={{ paddingLeft: "20px", zIndex: "0"}}>
        <FormGroup className="all-buttons">
          <FormControlLabel
            control={<Switch onChange={(event) => handleToggle(event)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#a80038',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#a80038',
              },
            }} />}
            label="Render"
          />
          <Popper id={id} open={open} anchorEl={anchorEl} placement="top-start">
            Note: You can only save when rendering is off
          </Popper>
          <ToggleButtonGroup
            onChange={handleFormat}
            aria-label="text formatting"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "90%",
              width: "100%",
              padding: "0px",
            }}
          >
            <ToggleButton
              value="bold"
              aria-label="bold"
              style={{
                border: "1px solid #2b2024",
                borderRadius: "0px",
                marginBottom: "5px",
                height: "100%",
              }}
            >
              <strong style={{ color: "#a80038" }}>B</strong>
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                height: "100%",
              }}
              value="italics"
              aria-label="bold"
            >
              <em style={{ color: "#a80038" }}>I</em>
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                height: "100%",
              }}
              value="underline"
              aria-label="bold"
            >
              <u style={{ color: "#a80038" }}>U</u>
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                color: "#a80038",
                height: "100%",
              }}
              value="code"
              aria-label="bold"
            >
              code
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                color: "#a80038",
                height: "100%",
              }}
              value="code block"
              aria-label="bold"
            >
              code block
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                color: "#a80038",
                height: "100%",
              }}
              value="bullet"
              aria-label="bold"
            >
              •
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                color: "#a80038",
                height: "100%",
              }}
              value="highlight"
              aria-label="bold"
            >
              highlight
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                height: "100%",
                color: "#a80038",
              }}
              value="block quote"
              aria-label="bold"
            >
              blockquote
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                height: "100%",
                color: "#a80038",
                textDecoration: "line-through",
              }}
              value="strike through"
              aria-label="bold"
            >
              Strike Through
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                height: "100%",
                color: "#a80038",
              }}
              value="h1"
              aria-label="bold"
            >
              H1
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                height: "100%",
                color: "#a80038",
              }}
              value="h2"
              aria-label="bold"
            >
              H2
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                height: "100%",
                color: "#a80038",
              }}
              value="h3"
              aria-label="bold"
            >
              H3
            </ToggleButton>
            <ToggleButton
              style={{
                marginBottom: "5px",
                border: "1px solid #2b2024",
                borderRadius: "0px",
                height: "100%",
                color: "#a80038",
              }}
              value="link"
              aria-label="bold"
            >
              Link
            </ToggleButton>
          </ToggleButtonGroup>
        </FormGroup>
        {/* switches between markdown and render */}
        {renderToggle === "code" ? (
          <div className="markDown-Results">
          <pre className="markDown-Results" ref={myElRef}>
            {userFormData.title ? `# ${userFormData.title} \n\n` : ""}
            {userFormData.description
              ? `## Description\n\n${
                  userFormData.deployedLink
                    ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n`
                    : ""
                }${userFormData.description}\n\n`
              : ""}
            {`${tableOfContents(userFormData)}\n\n`}
            {userFormData.installation
              ? `## Installation\n\n ${userFormData.installation}\n\n`
              : ""}
            {userFormData.usage ? `## Usage\n\n ${userFormData.usage}\n\n` : ""}
            {userFormData.credits
              ? `## Credits\n\n ${userFormData.credits}\n\n`
              : ""}
            {userFormData.license
              ? `## License\n\n ${userFormData.license}\n\n`
              : ""}
            {userFormData.tests ? `## Test\n\n ${userFormData.tests}\n\n` : ""}
          </pre>
          </div>
        ) : (
          <div>
            <div
            className="displaying-readme"
              dangerouslySetInnerHTML={{
                //uses markdown it
                __html: md.render(`${
                  userFormData.title ? `# ${userFormData.title} \n\n` : ""
                }${
                  userFormData.description
                    ? `## Description\n\n${
                        userFormData.deployedLink
                          ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n`
                          : ""
                      }${userFormData.description}\n\n`
                    : ""
                }${`${ToC}\n\n`}${
                  userFormData.installation
                    ? `## Installation\n\n ${userFormData.installation}\n\n`
                    : ""
                }${
                  userFormData.usage
                    ? `## Usage\n\n ${userFormData.usage}\n\n`
                    : ""
                }${
                  userFormData.credits
                    ? `## Credits\n\n ${userFormData.credits}\n\n`
                    : ""
                }${
                  userFormData.license
                    ? `## License\n\n ${userFormData.license}\n\n`
                    : ""
                }${
                  userFormData.tests
                    ? `## Test\n\n ${userFormData.tests}\n\n`
                    : ""
                }
                `),
              }}
            ></div>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ReadMeForm;
