#!/usr/bin/env node

/**
 * Generate environment variable data for production deployment
 * Run this locally to get the SENSITIVE_QUESTIONS_DATA env var value
 */

const fs = require('fs');
const path = require('path');

const sensitiveQuestionsPath = path.join(__dirname, 'src', 'sensitiveQuestions.ts');

try {
  // Read the sensitive questions file
  const sensitiveContent = fs.readFileSync(sensitiveQuestionsPath, 'utf8');
  
  // Extract the arrays using regex
  const thisOrThatMatch = sensitiveContent.match(/export const sensitiveThisOrThatQuestions: GameQuestion\[\] = (\[[\s\S]*?\]);/);
  const allModeMatch = sensitiveContent.match(/export const sensitiveAllModeQuestions: GameQuestion\[\] = (\[[\s\S]*?\]);/);
  
  if (!thisOrThatMatch || !allModeMatch) {
    console.error('❌ Could not extract question arrays from sensitiveQuestions.ts');
    process.exit(1);
  }
  
  // Create the data object
  const envData = {
    sensitiveThisOrThatQuestions: eval(thisOrThatMatch[1]),
    sensitiveAllModeQuestions: eval(allModeMatch[1])
  };
  
  // Convert to JSON string for environment variable
  const envVarData = JSON.stringify(envData);
  
  console.log('🎯 PRODUCTION DEPLOYMENT GUIDE');
  console.log('=============================');
  console.log('');
  console.log('To deploy with enhanced content, set this environment variable on Render:');
  console.log('');
  console.log('Variable Name: SENSITIVE_QUESTIONS_DATA');
  console.log('Variable Value:');
  console.log('```');
  console.log(envVarData);
  console.log('```');
  console.log('');
  console.log(`📊 This includes:`);
  console.log(`   - ${envData.sensitiveThisOrThatQuestions.length} ultra-sensitive questions (rating 11)`);
  console.log(`   - ${envData.sensitiveAllModeQuestions.length} enhanced questions (rating 7-10)`);
  console.log('');
  console.log('⚠️  WARNING: This contains sensitive content. Use appropriate security measures.');
  
} catch (error) {
  console.error('❌ Error reading sensitiveQuestions.ts:', error.message);
  console.error('💡 Make sure the file exists locally before running this script.');
} 