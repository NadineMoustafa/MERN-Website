
import React from "react";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";


// Create Document Component
const PDFPreview = ({ title }) => (
    
  <PDFViewer className="viewer">
    <Document>
      <Page size="A4" >
        <View ></View>
          <Text >{title}</Text>
          <Text>This is a text in a generated PDF file.</Text>
       
      </Page>
    </Document>
  </PDFViewer>




);

export default PDFPreview;