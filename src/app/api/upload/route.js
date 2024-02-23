// pages/api/projects.js
import { connect } from "../../../dbConfig/dbConfig";
import {join} from 'path'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { readFile } from "fs";
connect();

export async function POST(request) {
  const data = await request.formData()
  console.log({data})
  const file = data.get('file') 

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const relativePath = join(__dirname, '../', file.name);

 
  await writeFile(relativePath, buffer)
  console.log(`open ${relativePath} to see the uploaded file`)

  return NextResponse.json({ success: true })
}

export async function GET(request) {
    const { fileName } = request.params;
  
    const filePath = join(__dirname, '../', fileName);
  
    try {
      const buffer = await readFile(filePath);
      const contentType = 'image/jpeg'; // Set the appropriate content type based on the file type
  
      return NextResponse.ok(buffer, { headers: { 'Content-Type': contentType } });
    } catch (error) {
      // Handle file not found or other errors
      console.error(error);
      return NextResponse.notFound('File not found');
    }
  }