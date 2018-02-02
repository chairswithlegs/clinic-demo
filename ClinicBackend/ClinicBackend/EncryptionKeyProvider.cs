using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicBackend
{
    /// <summary>
    /// Manages how to encryption key is generated.
    /// </summary>
    public class EncryptionKeyProvider
    {
        public EncryptionKeyProvider()
        {
            Key = new Guid().ToString();
        }

        /// <summary>
        /// Returns the encryption key.
        /// </summary>
        public string Key { get; private set; }
    }
}
