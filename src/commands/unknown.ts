const unknownCommand = async (
  command: string,
  project: any,
  showAll: boolean,
  authToken: string,
) => {
  console.log(`Unkown command "${command}".`);
};

export default unknownCommand;
