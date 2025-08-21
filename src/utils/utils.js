/*
 * Title: Utils
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date:2025/08/22
 */
exports.ensureArray = (error) => {
  return Array.isArray(error) ? error : [error];
};
