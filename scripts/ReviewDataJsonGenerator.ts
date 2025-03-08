const path = require("path");
const fs = require("fs");

const reviews:any[] = [];
const directoryPath = path.join(__dirname, "../reviews");

const readReviewFile = (name: string, filename: string) => {
  const file = fs.readFileSync(filename);

  const reviewLines = getLinesFromReviewFile(file);
  const [metadataLines, contentLines] = extractContentFromReviewLines(reviewLines);

  const content = contentLines.join("\n");
  const review = createReviewObject(name, metadataLines, content);
  reviews.push(review);
};

const getLinesFromReviewFile = ((file:Buffer) => {
  return file.toString().replace(/\r\n/g, "\n").replaceAll('"', '\\"').split("\n");
});

const extractContentFromReviewLines = ((lines:string[]) => {
  let attributesOpen = false;

  let metadataLines = [];
  let contentLines = [];

  for (let line of lines) {
    if (line.startsWith("---") && !attributesOpen) {
      attributesOpen = true;
    } else if (line.startsWith("---") && attributesOpen) {
      attributesOpen = false;
    } else if (attributesOpen) {
      metadataLines.push(line);
    } else {
      contentLines.push(line);
    }
  }

  return [metadataLines, contentLines];
});

const createReviewObject = (filename: string, metadataLines: string[], content: string) => {
  const name = filename.replaceAll(".markdown", "");
  const metadata: any[string] = [];
  
  metadataLines.forEach(line => {
    let separatorIndex = line.indexOf(":");
    
    if(separatorIndex !== -1) {
      let key = line.substring(0, separatorIndex).trim();
      let value = line.substring(separatorIndex+1).trim();
      let arrayValues = undefined;
  
      if (value.startsWith("[")) {
        arrayValues = value.substring(1, value.length - 1).split(",");
      } 
  
      metadata[key] = arrayValues ? arrayValues : value;
    }
  });

  return ({
    name: name,
    title: metadata["title"],
    tags: metadata["tags"],
    image: `./review-images/${metadata["img"]}`,
    date: metadata["date"],
    workTitle: metadata["work-title"],
    author: metadata["author"],
    publishingYear: metadata["publishing-year"],
    content: content,
  });
};

let filenames:string[] = fs.readdirSync(directoryPath);

filenames.sort().forEach((filename) => {
  readReviewFile(filename, `${directoryPath}/${filename}`)
});

fs.writeFile(
  "src/data.json",
  JSON.stringify(reviews),
  (error: Error) => {
    if (error) throw error;

    console.log("Reviews Generated!");
  }
);
